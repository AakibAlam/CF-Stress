import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../../pages/signin/AuthContext";
import baseUrl from "../../baseurl.jsx";

function TestForm() {
  const { user } = useAuth();
  const [output, setOutput] = useState("Test Case: ");
  const [inputValue, setInputValue] = useState({
    contestId: "",
    problemId: "",
    submissionId: "",
    output: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      setOutput("Finding Test Case...");
      const data = await axios.post(
        baseUrl + "/test",
        { ...inputValue },
        { withCredentials: true, credentials: "include" }
      );
      setInputValue({
        contestId: "",
        problemId: "",
        submissionId: "",
      });
      const { status, testCase } = data.data;
      console.log("Hello there! ", status, testCase);
      if (status) {
        setOutput(testCase);
        console.log("successful stress testing :)\n");
        // setOutput(`Counter Example: ${counterExample}`);
      } else {
        console.log("Some issue in stress testing :(\n");
      }
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "10vh",
        alignItems: "center",
        margin: "1rem",
      }}
    >
      <Container>
        <Row>
          <Col sm={6} style={{ marginTop: "7rem", paddingLeft: "2rem" }}>
            <Form
              onSubmit={handleOnSubmit}
              style={{
                paddingLeft: "3rem",
                display: "flex",
                width: "75%",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="contestId"
                  onChange={handleOnChange}
                  value={inputValue.contestId}
                  placeholder="Contest Id"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="text"
                  name="problemId"
                  onChange={handleOnChange}
                  value={inputValue.problemId}
                  placeholder="Problem Id"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="text"
                  name="submissionId"
                  onChange={handleOnChange}
                  value={inputValue.submissionId}
                  placeholder="Submission Id"
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                style={{ width: "30%", marginBottom: "1rem" }}
              >
                Submit
              </Button>

              <Form.Group
                className="mb-3"
                controlId="formBasicPassword"
                style={{ textAlign: "center" }}
              ></Form.Group>
            </Form>
          </Col>
          <Col sm={6} style={{ marginTop: "5rem" }}>
            <Form
              style={{
                marginLeft: "3rem",
              }}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  as="textarea"
                  rows={10}
                  name="output"
                  style={{
                    overflowY: "top",
                  }}
                  value={output}
                  readOnly
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TestForm;
