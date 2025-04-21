import React, { Component } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavBar from "./NavBar.jsx";
import { appDetailsData } from "./data";
import { CONSTANTS } from "./constants.js";
import Button from "../components/Button.jsx";
import { FaSearch } from "react-icons/fa";

const PageWrapper = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: flex-start;
padding: 20px;

`;

const Container = styled.div`
background: white;
padding: 25px;
border-radius: 12px;
box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
width: 650px;
text-align: center;
margin-top: 20px;
`;

const Title = styled.h2`
  color: #0077B6;
  margin-bottom: 20px;
  font-weight: bold;
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #777;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 10px 10px 40px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #0077B6;
  }
`;

const AppointmentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const AppointmentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #ffffff;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const CalendarWrapper = styled.div`
  margin-bottom: 20px;
   display: flex;
  justify-content: center;
  .react-datepicker-wrapper {
    width: 400px;
  }
  .react-datepicker {
    width: 400px;
    font-size: 1em;
  }
  .react-datepicker__month-container {
    width: 400px;
  }
    .react-datepicker__header {
    background: #0077B6;
    border-bottom: none;
    padding: 15px 0;
    font-colour: white;
  }
`;

class AllAppointments extends Component {
  constructor() {
    super();
    this.state = {
      appointmentsList: appDetailsData.getData(),
      searchQuery: "",
      selectedDate: new Date(),
    };
  }

  handleView = (appId) => {
    this.props.history.push(`/viewAppointment/${appId}`);
  };

  handleEdit = (appId) => {
    this.props.history.push(`/editAppointment/${appId}`);
  };

  handleDelete = (appId) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      appDetailsData.deleteAppointment(appId);
      this.setState({ appointmentsList: appDetailsData.getData() });
    }
  };

  handleSearch = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  };

  getAppointmentsForDate = (appointments, selectedDate) => {
    return appointments.filter(appointment => {
      // Convert appointment date to start of day for comparison
      const appointmentDate = new Date(appointment.appdate);
      appointmentDate.setHours(0, 0, 0, 0);
      
      // Convert selected date to start of day
      const compareDate = new Date(selectedDate);
      compareDate.setHours(0, 0, 0, 0);
      
      // Compare the dates
      return appointmentDate.getTime() === compareDate.getTime();
    });
  };

  render() {
    const { appointmentsList, searchQuery, selectedDate } = this.state;

    // First filter by date
    const dateFilteredAppointments = this.getAppointmentsForDate(appointmentsList, selectedDate);

    // Then filter by search query
    const filteredAppointments = dateFilteredAppointments.filter((appointment) =>
      appointment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.slot.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <PageWrapper>
        <NavBar activecomponent={CONSTANTS.ALL_APPOINTMENTS} />
        <Container>
          <Title>List of All Appointments</Title>

          <CalendarWrapper>
            <DatePicker
              selected={selectedDate}
              onChange={this.handleDateChange}
              dateFormat="dd/MM/yyyy"
              inline
              calendarClassName="calendar"
            />
          </CalendarWrapper>

          <SearchWrapper>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="Search for an appointment..."
              value={searchQuery}
              onChange={this.handleSearch}
            />
          </SearchWrapper>

          {filteredAppointments.length === 0 ? (
            <p>No Appointments Found for {selectedDate.toLocaleDateString('en-GB')}</p>
          ) : (
            <AppointmentList>
              {filteredAppointments.map((appointment) => (
                <AppointmentItem key={appointment.appId}>
                  <span> {appointment.name}, {appointment.appType} - {appointment.slot}</span>
                  <ButtonGroup>
                    <Button onClick={() => this.handleView(appointment.appId)}>View</Button>
                    <Button onClick={() => this.handleEdit(appointment.appId)}>Edit</Button>
                    <Button onClick={() => this.handleDelete(appointment.appId)}>Delete</Button>
                  </ButtonGroup>
                </AppointmentItem>
              ))}
            </AppointmentList>
          )}
        </Container>
      </PageWrapper>
    );
  }
}

export default AllAppointments;
