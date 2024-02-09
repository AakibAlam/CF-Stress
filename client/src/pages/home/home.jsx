import Container from "react-bootstrap/Container";
import { TypeAnimation } from "react-type-animation";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAuth } from "../signin/AuthContext";

function Home() {
  return (
    <>
      <Container>
        <Row style={{ marginTop: "20vh" }}>
          <Col xs={1}> </Col>

          <Col xs={9}>
            <div>
              <h1
                style={{
                  marginBottom: "15px",
                  fontSize: "50px",
                }}
              >
                What is CF Stress ?{" "}
              </h1>

              <TypeAnimation
                sequence={[
                  `CF Stress is a tool designed Codeforces, one of the top competitive programming websites globally. This tool is utilized to identify the smallest test case that could potentially result in the failure of any non-interactive problem submission on Codeforces.`,
                  1000,
                  "",
                ]}
                speed={50}
                style={{ whiteSpace: "pre-line", fontSize: "2em" }}
                repeat={Infinity}
              />
            </div>
          </Col>
          <Col xs={2}></Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
