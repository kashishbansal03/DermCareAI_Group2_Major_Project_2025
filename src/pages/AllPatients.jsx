import React, { Component } from "react";
import styled from "styled-components";
import NavBar from "./NavBar.jsx";
import { patientDetailsData } from "./data.js";
import { appDetailsData } from "./data.js";
import { CONSTANTS } from "./constants.js";
import Button from "../components/Button.jsx";
import { FaSearch } from "react-icons/fa";

const PageWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 40px); // Account for padding
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const Container = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  text-align: center;
  height: fit-content;
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

const PatientList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const PatientItem = styled.div`
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

class AllPatients extends Component {
  constructor() {
    super();
    this.state = {
      patientsList: patientDetailsData.getData(),
      searchQuery: "",
    };
  }

  handleView = (id) => {
    this.props.history.push(`/viewPatient/${id}`);
  };

  handleEdit = (id) => {
    this.props.history.push(`/editPatient/${id}`);
  };

  handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      // Get the patient's name before deleting
      const patient = patientDetailsData.getPatientDetails(id);
      if (!patient) return; // If patient doesn't exist, exit
  
      const patientName = patient.name; // Get the name
  
      // 🔹 Remove all appointments related to this patient
      Object.keys(appDetailsData.appDetails).forEach((appId) => {
        if (appDetailsData.appDetails[appId].name === patientName) {
          appDetailsData.deleteAppointment(appId); // ✅ Correct deletion
        }
      });
  
      // 🔹 Remove the patient
      patientDetailsData.deletePatient(id);
  
      // 🔹 Update state
      this.setState({
        patientsList: patientDetailsData.getData(),
      });
    }
  };
  
  

  handleSearch = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    const { patientsList, searchQuery } = this.state;

    // Filter patients based on search query
    const filteredPatients = patientsList.filter((patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <PageWrapper>
        <NavBar activecomponent={CONSTANTS.ALL_PATIENTS} />
        <Container>
          <Title>List of All Patients</Title>

          {/* Search Bar */}
          <SearchWrapper>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="Search for a patient..."
              value={searchQuery}
              onChange={this.handleSearch}
            />
          </SearchWrapper>

          {filteredPatients.length === 0 ? (
            <p>No Patients Found</p>
          ) : (
            <PatientList>
              {filteredPatients.map((patient) => (
                <PatientItem key={patient.id}>
                  <span>{patient.name}</span>
                  <ButtonGroup>
                    <Button onClick={() => this.handleView(patient.id)}>View</Button>
                    <Button onClick={() => this.handleEdit(patient.id)}>Edit</Button>
                    <Button onClick={() => this.handleDelete(patient.id)}>Delete</Button>
                  </ButtonGroup>
                </PatientItem>
              ))}
            </PatientList>
          )}
        </Container>
      </PageWrapper>
    );
  }
}

export default AllPatients;
