import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavBar from "./NavBar.jsx";
import { appDetailsData, patientDetailsData } from "./data";
import { CONSTANTS } from "./constants.js";
import Button from "../components/Button.jsx";
import styled from "styled-components";

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const FormContainer = styled.div`
  background: white;
  padding: 35px;
  border-radius: 12px;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
  width: 500px;;
  max-width: 800px;
  text-align: center;
`;

const Title = styled.h2`
  color: #0077B6;
  margin-bottom: 20px;
  font-weight: bold;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  text-align: left;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  transition: border 0.3s;

  &:focus {
    border-color: #0077B6;
    outline: none;
  }
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: border 0.3s;

  &:focus {
    border-color: #0077B6;
    outline: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  button {
    padding: 8px 12px;
    font-size: 14px;
  }
`;
const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  transition: border 0.3s;

  &:focus {
    border-color: #0077B6;
    outline: none;
  }
`;
const CalendarContainer = styled.div`
  .react-datepicker {
    font-size: 1em;
    width: 100%;
  }
  .react-datepicker__month-container {
    width: 100%;
  }
  .react-datepicker__header {
    background-color: #0077B6;
    color: white;
  }
  .react-datepicker__current-month {
    color: white;
    font-size: 1.2em;
  }
  .react-datepicker__day {
    width: 2em;
    line-height: 2em;
    margin: 0.2em;
    &:hover {
      background-color: #e6f3ff;
    }
  }
  .react-datepicker__day--selected {
    background-color: #0077B6;
    color: white;
  }
  .react-datepicker__day-name {
    color: white;
    width: 2em;
    line-height: 2em;
    margin: 0.2em;
  }
`;
class BookAppointment extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      appdate: null,
      slot: "",
      appType: "",
      notes: "",
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
    const { name, appdate, slot, appType, notes } = this.state;

    if (!name || !appdate || !slot || !appType) {
      alert("Please fill all required fields.");
      return;
    }

    alert("Appointment scheduled successfully!");
    appDetailsData.add(name, appType, appdate, slot, notes);
    this.props.history.push("/allAppointments");
  };

  handleCancel = () => {
    this.props.history.push("/allAppointments");
  };

  render() {
    const availableNames = patientDetailsData.getName();
    const { name, appdate, slot, appType, notes } = this.state;

    return (
      <PageWrapper>
        <NavBar activecomponent={CONSTANTS.BOOK_APPOINTMENT} />
        <FormContainer>
          <Title>Book an Appointment</Title>
          <form onSubmit={this.handleSubmit}>
            <FormField>
              <Label>Name of the Patient</Label>
              <Select name="name" value={name} onChange={this.handleChange}>
                <option value="">Select Patient</option>
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
  <Label>Date</Label>
  <CalendarContainer>
    <StyledDatePicker
      selected={appdate}
      onChange={this.handleDateChange}
      dateFormat="dd/MM/yyyy"
      placeholderText="Select a date"
      inline // This makes the calendar always visible
      minDate={new Date()} // Prevents selecting past dates
      filterDate={date => date.getDay() !== 0} // Disable Sundays
      calendarClassName="custom-calendar"
    />
  </CalendarContainer>
</FormField>

            <FormField>
              <Label>Time Slot</Label>
              <Select name="slot" value={slot} onChange={this.handleChange}>
                <option value="">Select Time Slot</option>
                <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                <option value="03:00 PM - 04:00 PM">03:00 PM - 04:00 PM</option>
                <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
              </Select>
            </FormField>

            <FormField>
              <Label>Appointment Type</Label>
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
              <Button type="submit">Schedule Appointment</Button>
              <Button type="button" onClick={this.handleCancel}>
                Cancel
              </Button>
            </ButtonGroup>
          </form>
        </FormContainer>
      </PageWrapper>
    );
  }
}

export default BookAppointment;
