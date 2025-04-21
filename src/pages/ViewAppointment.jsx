import React, { Component } from "react";
import styled from "styled-components";
import Button from "../components/Button.jsx";
import NavBar from "./NavBar.jsx";
import { appDetailsData } from "./data.js";

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

const InfoRow = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 15px;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 8px;
  color: #444;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

class ViewAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointment: appDetailsData.getAppointmentDetails(props.match.params.appId),
    };
  }

  handleClose = () => {
    this.props.history.push("/allAppointments");
  };

  render() {
    const { appointment } = this.state;
    if (!appointment) {
      return <h1 style={{ textAlign: "center" }}>No appointments found</h1>;
    }
    const date = new Date(appointment.appdate);
    return (
      <PageWrapper>
        <NavBar />
        <Container>
          <FormWrapper>
            <Title>Viewing Appointment</Title>
            <InfoRow><strong>Patient Name:</strong> {appointment.name}</InfoRow>
            <InfoRow><strong>Date:</strong> {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</InfoRow>
            <InfoRow><strong>Time Slot:</strong> {appointment.slot}</InfoRow>
            <InfoRow><strong>Appointment Type: </strong>{appointment.appType}</InfoRow>
            <InfoRow><strong>Notes:</strong> {appointment.notes || "No notes available"}</InfoRow>
            <ButtonGroup>
              <Button onClick={this.handleClose}>Close</Button>
            </ButtonGroup>
          </FormWrapper>
        </Container>
      </PageWrapper>
    );
  }
}

export default ViewAppointment;
