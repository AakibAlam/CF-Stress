import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useCookies } from "react-cookie";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useAuth } from "../../pages/signin/AuthContext";
import "./nav.css";

function NavBar() {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useAuth();
  const [cookies, removeCookie] = useCookies([]);

  console.log("token: ", cookies.token);

  useEffect(() => {
    if (cookies.token === "undefined") {
      setUser(null);
    }
    setLoading(false);
  }, [cookies.token]);

  const handleLogout = () => {
    removeCookie("token");
    setUser(null);
    setLoading(false);
  };

  return (
    <>
      <Navbar expand="lg" className="mb-3 custom-color">
        <Container fluid>
          <Navbar.Brand
            style={{ fontSize: "27px", color: "white", marginLeft: "2rem" }}
          >
            CF Stress
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-lg"
            aria-labelledby="offcanvasNavbar-expand-lg"
            placement="end"
            className="custom-color"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title
                id="offcanvasNavbar-expand-lg"
                style={{ fontSize: "27px", color: "white" }}
              >
                CF Stress
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/test">Test</Nav.Link>
                <Nav.Link href="/contribute">Contribute</Nav.Link>
                <Nav.Link href="/contact">Contact</Nav.Link>
                {loading ? (
                  <Button className="sign-in-button" variant="primary">
                    Loading...
                  </Button>
                ) : (
                  <>
                    {user ? (
                      <Button
                        className="sign-in-button"
                        variant="primary"
                        onClick={handleLogout}
                      >
                        Sign Out
                      </Button>
                    ) : (
                      <Button
                        className="sign-in-button"
                        variant="primary"
                        href="/signin"
                      >
                        Sign In
                      </Button>
                    )}
                  </>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
