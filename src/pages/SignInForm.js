import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { adminDetailsData } from "./data.js";
import "../App.css";
import Button from "../components/Button.jsx";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormWrapper = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

const Title = styled.h3`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const FormField = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  display: block;
  margin-bottom: 5px;
  color: #444;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  transition: 0.3s ease-in-out;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
  }
`;

const ForgotPassword = styled.div`
  text-align: right;
  margin-top: 5px;
  font-size: 13px;
  color: #007bff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const SignupRedirect = styled.div`
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
  color: #666;
`;

const SignupLink = styled(NavLink)`
  color: #007bff;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

class SignInForm extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      adminDetails: adminDetailsData.getData(),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    const { adminDetails, email, password } = this.state;
    let validCredentials = false;

    if (this.canBeSubmitted()) {
      adminDetails.forEach((admin) => {
        if (email === admin.email && password === admin.password) {
          validCredentials = true;
          adminDetailsData.setCurrentUser(admin.adminId);
          this.props.history.push("/allpatients");
        }
      });

      if (!validCredentials) {
        alert("Invalid credentials. Please try again.");
        this.setState({ password: "" });
      }
    }
  }

  canBeSubmitted() {
    const { email, password } = this.state;
    return email.length > 0 && password.length > 0;
  }

  render() {
    return (
      <Container>
        <FormWrapper>
          <Title>DermCareAI - Login</Title>

          <form onSubmit={this.handleSubmit}>
            <FormField>
              <Label>Email</Label>
              <Input
                id="email"
                onChange={this.handleChange}
                name="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </FormField>

            <FormField>
              <Label>Password</Label>
              <Input
                id="password"
                onChange={this.handleChange}
                name="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </FormField>

            <ForgotPassword>Forgot Password?</ForgotPassword>

            <Button className="FormField__Button">Login</Button>

            <SignupRedirect>
              Don't have an account? <SignupLink to="/sign-up">Sign Up</SignupLink>
            </SignupRedirect>
          </form>
        </FormWrapper>
      </Container>
    );
  }
}

export default SignInForm;
