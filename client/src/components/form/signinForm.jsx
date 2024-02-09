import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAuth } from "../../pages/signin/AuthContext";
import baseUrl from "../../baseurl.jsx";

function SigninForm() {
  const Navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
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
      const data = await axios.post(
        baseUrl + "/signin",
        { ...inputValue },
        { withCredentials: true, credentials: "include" }
      );
      const { success, message, user } = data.data;
      if (success) {
        console.log("Sign In Successful!\n");
        setTimeout(() => {
          setUser(user);
          Navigate("/");
        }, 1000);
      } else {
        console.log(`Unsuccessful ${message}`);
      }
      setInputValue({
        email: "",
        password: "",
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
      <Form
        onSubmit={handleOnSubmit}
        style={{
          width: "26rem",
          backgroundColor: "aliceblue",
          padding: "2rem",
        }}
      >
        <h2 style={{ textAlign: "center", margin: "1rem" }}> Sign In</h2>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            name="email"
            onChange={handleOnChange}
            value={inputValue.email}
            placeholder="Email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            name="password"
            onChange={handleOnChange}
            value={inputValue.password}
            placeholder="Password"
          />
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formBasicCheckbox"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Form.Check type="checkbox" label="Remember me" />
          <a href="/forgot-password" style={{ marginLeft: "auto" }}>
            Forgot Password
          </a>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          style={{ width: "100%", marginBottom: "1rem" }}
        >
          Submit
        </Button>

        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          style={{ textAlign: "center" }}
        >
          <Form.Label>
            Don't have an account? <a href="/signup">Sign Up</a>
          </Form.Label>
        </Form.Group>
      </Form>
    </div>
  );
}

export default SigninForm;
