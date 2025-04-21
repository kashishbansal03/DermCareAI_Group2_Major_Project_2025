import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import Button from "../components/Button.jsx";
import NavBar from "./NavBar.jsx";
import { appDetailsData, patientDetailsData } from "./data.js";

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
  height: fit-content;
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

const Select = styled.select`
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

class EditAppointment extends Component {
  constructor(props) {
    super(props);
    const appointment = appDetailsData.getAppointmentDetails(props.match.params.appId) || {};
    this.state = {
      name: appointment.name || "",
      appdate: appointment.appdate || "",
      slot: appointment.slot || "",
      appType: appointment.appType || "",
      notes: appointment.notes || "",
      appointment,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDateChange = (date) => {
    this.setState({ appdate: date });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.canBeSubmitted()) {
      alert("Appointment Updated Successfully");
      appDetailsData.edit(
        this.state.appointment.appId,
        this.state.name,
        this.state.appType, // 👈 Corrected order
        this.state.appdate,
        this.state.slot,
        this.state.notes
      );
      this.props.history.push("/allAppointments");
    }
  };

  canBeSubmitted() {
    const { name, appdate, slot, appType } = this.state;
    return name && appdate && slot && appType;
  }

  handleCancel = () => {
    this.props.history.push("/allAppointments");
  };

  render() {
    const availableNames = patientDetailsData.getName();
    const { name, appdate, slot, appType, notes } = this.state;
    return (
      <PageWrapper>
        <NavBar />
        <Container>
          <FormWrapper>
            <Title>Edit Appointment</Title>
            <form onSubmit={this.handleSubmit}>
              <FormField>
                <Label>Patient Name *</Label>
                <Select name="name" value={name} onChange={this.handleChange}>
                  <option value="">Select a Patient</option>
                  {availableNames.length > 0 ? (
                    availableNames.map((patient, i) => (
                      <option key={i} value={patient}>
                        {patient}
                      </option>
                    ))
                  ) : (
                    <option value="N/A">No available patients</option>
                  )}
                </Select>
              </FormField>

              <FormField>
                <Label>Appointment Date *</Label>
                <DatePicker
                  selected={appdate}
                  onChange={this.handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select Date"
                />
              </FormField>

              <FormField>
                <Label>Time Slot *</Label>
                <Select name="slot" value={slot} onChange={this.handleChange}>
                  <option value="">Select a Slot</option>
                  <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                <option value="03:00 PM - 04:00 PM">03:00 PM - 04:00 PM</option>
                <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                </Select>
              </FormField>

              <FormField>
                <Label>Appointment Type *</Label>
                <Select name="appType" value={appType} onChange={this.handleChange}>
                  <option value="">Select Type</option>
                  <option value="Follow-up">Follow-up</option>
                <option value="Consultation">Consultation</option>
                <option value="Emergency">Procedure</option>
                </Select>
              </FormField>

              <FormField>
                <Label>Notes</Label>
                <Input
                  type="text"
                  name="notes"
                  placeholder="Enter additional details"
                  value={notes}
                  onChange={this.handleChange}
                />
              </FormField>

              <ButtonGroup>
                <Button type="submit">Update Appointment</Button>
                <Button type="button" onClick={this.handleCancel}>Cancel</Button>
              </ButtonGroup>
            </form>
          </FormWrapper>
        </Container>
      </PageWrapper>
    );
  }
}

export default EditAppointment;
