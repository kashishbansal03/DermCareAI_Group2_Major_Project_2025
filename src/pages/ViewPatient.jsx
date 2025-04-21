import React, { Component } from "react";
import styled from "styled-components";
import NavBar from "./NavBar.jsx";
import { patientDetailsData } from "./data.js";
import Button from "../components/Button.jsx";

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

const InfoBox = styled.div`
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

const InfoText = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ReportSection = styled.div`
  margin-top: 20px;
`;

const ReportTitle = styled.h4`
  margin-bottom: 10px;
  color: #0077b6;
`;

const ReportItem = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const ReportImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  margin-bottom: 10px;
  border-radius: 8px;
`;

class ViewPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: null
    };
  }

  componentDidMount() {
    this.loadPatientData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadPatientData(); // Reload data if ID changes
    }
  }

  loadPatientData = () => {
    const patient = patientDetailsData.viewPatientDetails(this.props.match.params.id);
    if (patient) {
      this.setState({ patient });
    } else {
      this.setState({ patient: null }); // Handle case where patient data isn't found
    }
  };

  handleEdit = () => {
    this.props.history.push(`/editPatient/${this.props.match.params.id}`);
  };

  handleBack = () => {
    this.props.history.push("/allPatients");
  };

  render() {
    const { patient } = this.state;

    if (!patient) {
      return (
        <PageWrapper>
          <NavBar />
          <Container>
            <InfoBox>
              <Title>Patient Not Found</Title>
              <ButtonGroup>
                <button onClick={this.handleBack}>Back</button>
              </ButtonGroup>
            </InfoBox>
          </Container>
        </PageWrapper>
      );
    }

    return (
      <PageWrapper>
        <NavBar />
        <Container>
          <InfoBox>
            <Title>Patient Details</Title>
            <InfoText><strong>Name:</strong> {patient.name}</InfoText>
            <InfoText><strong>Age:</strong> {patient.age}</InfoText>
            <InfoText><strong>Gender:</strong> {patient.gender}</InfoText>
            <InfoText><strong>Phone:</strong> {patient.phone}</InfoText>
            <InfoText><strong>Email:</strong> {patient.email}</InfoText>
            <InfoText><strong>Address:</strong> {patient.address}</InfoText>
            <InfoText><strong>Medical History:</strong> {patient.medicalHistory}</InfoText>
            <InfoText><strong>Allergies:</strong> {patient.allergies}</InfoText>
            <InfoText><strong>Medications:</strong> {patient.medications}</InfoText>

            {patient.reports && patient.reports.length > 0 && (
              <ReportSection>
                <ReportTitle>Reports</ReportTitle>
                {patient.reports.map((report, index) => (
                  <ReportItem key={index}>
                    <ReportImage src={URL.createObjectURL(report.image)} alt="Uploaded" />
                    <ReportImage src={report.processedImage} alt="Processed" />
                    <InfoText><strong>Recommendations:</strong> {report.recommendations}</InfoText>
                  </ReportItem>
                ))}
              </ReportSection>
            )}

            <ButtonGroup>
              <Button onClick={this.handleBack}>Back</Button>
            </ButtonGroup>
          </InfoBox>
        </Container>
      </PageWrapper>
    );
  }
}

export default ViewPatient;
