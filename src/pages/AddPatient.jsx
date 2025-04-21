import React, { Component } from "react";
import styled from "styled-components";
import { patientDetailsData } from "./data.js";
import { CONSTANTS } from "./constants.js";
import Button from "../components/Button.jsx";
import NavBar from "./NavBar.jsx";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 20px;
`;

const FormWrapper = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 35px 40px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
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
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
`;

const GenderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const GenderLabel = styled.label`
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  flex: 1;
  text-align: center;
  margin-right: 5px;
  background: ${(props) => (props.selected ? "#0077B6" : "#fff")};
  color: ${(props) => (props.selected ? "#fff" : "#000")};
`;

class AddPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      gender: "Male",
      phone: "",
      email: "",
      address: "",
      medicalHistory: "",
      allergies: "",
      medications: ""
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleGenderChange = (gender) => {
    this.setState({ gender });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.canBeSubmitted()) {
      alert("Patient Added successfully");
      patientDetailsData.add(
        this.state.name,
        this.state.age,
        this.state.gender,
        this.state.phone,
        this.state.email,
        this.state.address,
        this.state.medicalHistory,
        this.state.allergies,
        this.state.medications
      );
      this.props.history.push("/allPatients");
    }
  };

  canBeSubmitted() {
    const { name, age, gender, phone, email, address } = this.state;
    return name && age && gender && phone && email && address;
  }

  render() {
    return (
      <NavBar activecomponent={CONSTANTS.ADD_PATIENT}>
        <Container>
          <FormWrapper>
            <Title>Add New Patient</Title>
            <form onSubmit={this.handleSubmit}>
              <FormField>
                <Label>Full Name *</Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  onChange={this.handleChange}
                />
              </FormField>

              <FormField>
                <Label>Age *</Label>
                <Input
                  type="number"
                  name="age"
                  placeholder="Enter age"
                  onChange={this.handleChange}
                />
              </FormField>

              <FormField>
                <Label>Gender</Label>
                <GenderWrapper>
                  {["Male", "Female", "Other"].map((g) => (
                    <GenderLabel
                      key={g}
                      onClick={() => this.handleGenderChange(g)}
                      selected={this.state.gender === g}
                    >
                      {g}
                    </GenderLabel>
                  ))}
                </GenderWrapper>
              </FormField>

              <FormField>
                <Label>Phone Number</Label>
                <Input
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  onChange={this.handleChange}
                />
              </FormField>

              <FormField>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={this.handleChange}
                />
              </FormField>

              <FormField>
                <Label>Address</Label>
                <Input
                  type="text"
                  name="address"
                  placeholder="Enter address"
                  onChange={this.handleChange}
                />
              </FormField>

              <FormField>
                <Label>Medical History</Label>
                <Input
                  type="text"
                  name="medicalHistory"
                  placeholder="Enter medical history"
                  onChange={this.handleChange}
                />
              </FormField>

              <FormField>
                <Label>Allergies</Label>
                <Input
                  type="text"
                  name="allergies"
                  placeholder="Enter allergies"
                  onChange={this.handleChange}
                />
              </FormField>

              <FormField>
                <Label>Current Medications</Label>
                <Input
                  type="text"
                  name="medications"
                  placeholder="Enter medications"
                  onChange={this.handleChange}
                />
              </FormField>

              <Button type="submit">Add Patient</Button>
            </form>
          </FormWrapper>
        </Container>
      </NavBar>
    );
  }
}

export default AddPatient;
