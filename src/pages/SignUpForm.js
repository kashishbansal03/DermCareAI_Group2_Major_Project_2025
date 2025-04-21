import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { adminDetailsData } from "./data.js";
import styled from "styled-components";
import Button from "../components/Button.jsx";

// Styled components for UI consistency
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin-top: 50px; 
  padding: 20px;
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

const LoginRedirect = styled.div`
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
  color: #666;
`;

const LoginLink = styled(NavLink)`
  color: #007bff;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      mobileNo: "",
      licenseNo: "",
      specialization: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.canBeSubmitted()) {
      adminDetailsData.add(
        this.state.fullName,
        this.state.email,
        this.state.licenseNo,
        this.state.specialization,
        this.state.mobileNo,
        this.state.password
      );
      this.props.history.push("/");
    }
  };

  canBeSubmitted() {
    const { fullName, email, mobileNo, licenseNo, specialization, password, confirmPassword } = this.state;
    return (
      fullName.length > 2 &&
      email.includes("@") &&
      mobileNo.length === 10 &&
      licenseNo.length > 4 &&
      specialization.length > 4 &&
      password.length >= 4 &&
      password === confirmPassword
    );
  }

  render() {
    return (
      <Container>
        <FormWrapper>
          <Title>Create Account</Title>
          <form onSubmit={this.handleSubmit}>
            <FormField>
              <Label>Full Name</Label>
              <Input name="fullName" type="text" placeholder="Enter your full name" required onChange={this.handleChange} />
            </FormField>
            
            <FormField>
              <Label>Email</Label>
              <Input name="email" type="email" placeholder="Enter your email" required onChange={this.handleChange} />
            </FormField>
            
            <FormField>
              <Label>License Number</Label>
              <Input name="licenseNo" type="text" placeholder="Enter License Number" required onChange={this.handleChange} />
            </FormField>
            
            <FormField>
              <Label>Specialization</Label>
              <Input name="specialization" type="text" placeholder="Enter Specialization" required onChange={this.handleChange} />
            </FormField>
            <FormField>
              <Label>Phone Number</Label>
              <Input name="mobileNo" type="tel" placeholder="Enter your phone number" required onChange={this.handleChange} />
            </FormField>
            
            <FormField>
              <Label>Password</Label>
              <Input name="password" type="password" placeholder="Enter password" required onChange={this.handleChange} />
            </FormField>
            
            <FormField>
              <Label>Confirm Password</Label>
              <Input name="confirmPassword" type="password" placeholder="Confirm your password" required onChange={this.handleChange} />
            </FormField>
            
            <Button type="submit">Register</Button>
            
            <LoginRedirect>
              Already have an account? <LoginLink to="/">Login</LoginLink>
            </LoginRedirect>
          </form>
        </FormWrapper>
      </Container>
    );
  }
}

export default SignUpForm;
