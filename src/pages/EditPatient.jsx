import React, { Component } from "react";
import styled from "styled-components";
import Button from "../components/Button.jsx";
import NavBar from "./NavBar.jsx";
import { patientDetailsData } from "./data.js";

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: fit-content
`;

const FormWrapper = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
`;

class EditPatient extends Component {
  constructor(props) {
    super(props);
    
    const patientId = this.props.match.params.id; // Get ID from URL (React Router v5)
    const patient = patientDetailsData.getPatientDetails(patientId) || {};

    this.state = {
      id: patientId,
      name: patient.name || "",
      age: patient.age || "",
      gender: patient.gender || "",
      phone: patient.phone || "",
      email: patient.email || "",
      address: patient.address || "",
      medicalHistory: patient.medicalHistory || "",
      allergies: patient.allergies || "",
      medications: patient.medications || "",
      dob: patient.dob || "",
      location: patient.location || "",
      mobile: patient.mobile || "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.state.id) {
      alert("Error: Patient ID is missing!");
      return;
    }

    patientDetailsData.edit(
      this.state.id,
      this.state.name,
      this.state.age,
      this.state.gender,
      this.state.phone,
      this.state.email,
      this.state.address,
      this.state.medicalHistory,
      this.state.allergies,
      this.state.medications,
      this.state.dob,
      this.state.location,
      this.state.mobile
    );

    alert("Profile Updated Successfully!");

    if (this.props.history) {
      this.props.history.push("/allPatients"); // Redirect to patient list
    } else {
      console.warn("History object is undefined!");
    }
  };

  handleCancel = () => {
    this.props.history.push("/allPatients");
  };

  render() {
    const { name, age, gender, phone, email, address, medicalHistory, allergies, medications, dob, location, mobile } = this.state;
    return (
      <PageWrapper>
        <NavBar />
        <Container>
          <FormWrapper>
            <Title>Edit Patient</Title>
            <form onSubmit={this.handleSubmit}>
              <FormField>
                <Label>Name *</Label>
                <Input type="text" name="name" value={name} onChange={this.handleChange} />
              </FormField>

              <FormField>
                <Label>Age *</Label>
                <Input type="number" name="age" value={age} onChange={this.handleChange} />
              </FormField>

              <FormField>
                <Label>Gender *</Label>
                <Input type="text" name="gender" value={gender} onChange={this.handleChange} />
              </FormField>

              <FormField>
                <Label>Phone *</Label>
                <Input type="text" name="phone" value={phone} onChange={this.handleChange} />
              </FormField>

              <FormField>
                <Label>Email *</Label>
                <Input type="email" name="email" value={email} onChange={this.handleChange} />
              </FormField>

              <FormField>
                <Label>Address *</Label>
                <Input type="text" name="address" value={address} onChange={this.handleChange} />
              </FormField>

              <FormField>
                <Label>Medical History *</Label>
                <Input type="text" name="medicalHistory" value={medicalHistory} onChange={this.handleChange} />
              </FormField>

              <FormField>
                <Label>Allergies *</Label>
                <Input type="text" name="allergies" value={allergies} onChange={this.handleChange} />
              </FormField>

              <FormField>
                <Label>Medications *</Label>
                <Input type="text" name="medications" value={medications} onChange={this.handleChange} />
              </FormField>

              <FormField>
                <Label>Mobile *</Label>
                <Input type="text" name="mobile" value={mobile} onChange={this.handleChange} />
              </FormField>

              <ButtonGroup>
                <Button type="submit">Update Profile</Button>
                <Button type="button" onClick={this.handleCancel}>Cancel</Button>
              </ButtonGroup>
            </form>
          </FormWrapper>
        </Container>
      </PageWrapper>
    );
  }
}

export default EditPatient;
