import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../baseurl.jsx";

function SignupForm() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    name: "",
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
        baseUrl + "/signup",
        { ...inputValue },
        { withCredentials: true, credentials: "include" }
      );
      const { success, message } = data.data;
      if (success) {
        console.log("Sign up successful!!\n");
        setTimeout(() => {
          navigate("/signin");
        }, 1000);
      } else {
        console.log(`Unsuccessful: ${message}`);
      }
      setInputValue({
        ...inputValue,
        name: "",
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
        <h2 style={{ textAlign: "center", margin: "1rem" }}> Sign Up</h2>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Control
            type="text"
            name="name"
            value={inputValue.name}
            placeholder="Name"
            onChange={handleOnChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            name="email"
            value={inputValue.email}
            placeholder="Email"
            onChange={handleOnChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            name="password"
            value={inputValue.password}
            placeholder="Password"
            onChange={handleOnChange}
          />
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
            Already a user? <a href="/signin">Sign In</a>
          </Form.Label>
        </Form.Group>
      </Form>
    </div>
  );
}

export default SignupForm;
