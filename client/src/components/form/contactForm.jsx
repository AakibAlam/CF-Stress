import { useState } from "react";
import emailjs from "emailjs-com";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../../pages/signin/AuthContext";
const {
  VITE_MY_EMAIL,
  VITE_YOUR_SERVICE_ID,
  VITE_YOUR_TEMPLATE_ID,
  VITE_YOUR_USER_ID,
} = import.meta.env;

function ContactForm() {
  const { user } = useAuth();
  const [inputValue, setInputValue] = useState({
    message: "",
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

    const templateParams = {
      from_name: user.email,
      user_name: user.name,
      to_name: VITE_MY_EMAIL,
      message: inputValue.message,
    };

    console.log(templateParams);

    emailjs
      .send(
        VITE_YOUR_SERVICE_ID,
        VITE_YOUR_TEMPLATE_ID,
        templateParams,
        VITE_YOUR_USER_ID
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (error) => {
          console.log("FAILED...", error);
        }
      );

    try {
      setInputValue({
        message: "",
      });
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
        alignItems: "center",
        height: "80vh",
        margin: "1rem",
      }}
    >
      <Container>
        <Row>
          <Col sm={4}>
            <h5>Get in touch</h5>
            <h5>
              {" "}
              Email:{" "}
              <a href="mailto:mdaakibalamansari@gmail.com">
                mdaakibalamansari@gmail.com
              </a>{" "}
            </h5>
            <h5>Looking forward to hearing from you!</h5>
          </Col>
          <Col sm={8}>
            <Form
              onSubmit={handleOnSubmit}
              style={{
                marginLeft: "5rem",
              }}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="message"
                  style={{
                    width: "80%",
                    overflowY: "top",
                  }}
                  onChange={handleOnChange}
                  value={inputValue.message}
                  placeholder="Message"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Send
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ContactForm;
