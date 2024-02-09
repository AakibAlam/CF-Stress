import Container from "react-bootstrap/Container";
import { TypeAnimation } from "react-type-animation";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Contribute() {
  return (
    <>
      <Container>
        <Row style={{ marginTop: "12vh" }}>
          <Col xs={1}></Col>
          <Col xs={9}>
            <div>
              <h1
                style={{
                  marginTop: "50px",
                  marginBottom: "15px",
                  fontSize: "50px",
                }}
              >
                Passionate about contributing ?{" "}
              </h1>

              <TypeAnimation
                sequence={[
                  `We invite you to create input generators for problems. If you discover that a problem's generator is not already present in the system, kindly craft and submit it for the benefit of others. Your valuable contributions enhance the overall experience for the community.`,
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

export default Contribute;
