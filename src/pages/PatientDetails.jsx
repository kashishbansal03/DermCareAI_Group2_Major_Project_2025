import React, { Component } from "react";
import styled from "styled-components";
import NavBar from "./NavBar.jsx";
import { patientDetailsData } from "./data.js";
import { CONSTANTS } from "./constants.js";
import Button from "../components/Button.jsx";
import { FaFilePdf, FaShare, FaCalendarPlus } from "react-icons/fa";
import { withRouter } from "react-router-dom";

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #0077B6;
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
`;

const PatientInfo = styled.div`
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
`;

const InfoRow = styled.div`
  display: flex;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InfoLabel = styled.div`
  font-weight: 600;
  width: 200px;
  color: #555;
`;

const InfoValue = styled.div`
  flex: 1;
`;

const SectionTitle = styled.h3`
  color: #0077B6;
  margin: 25px 0 15px;
  font-size: 1.2rem;
`;

const ReportsList = styled.div`
  margin-top: 20px;
`;

const ReportCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  background-color: #f9f9f9;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ReportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const ReportTitle = styled.h4`
  color: #0077B6;
  margin: 0;
`;

const ReportDate = styled.span`
  color: #666;
`;

const ReportSection = styled.div`
  margin-bottom: 10px;
`;

const ReportSectionTitle = styled.div`
  font-weight: 600;
  color: #555;
  margin-bottom: 3px;
`;

const ReportContent = styled.p`
  margin: 0;
  line-height: 1.4;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
`;

const ActionButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 8px 15px;
  font-size: 0.9rem;
  
  svg {
    font-size: 14px;
  }
`;

const NoReportsMessage = styled.p`
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 20px;
`;

class PatientDetails extends Component {
  constructor(props) {
    super(props);
    
    // Get patientId without optional chaining
    const patientId = this.props.match.params.id || 
      (this.props.location && this.props.location.state && this.props.location.state.patientId);
      
    this.state = {
      patientId: patientId,
      patient: null
    };
  }

  componentDidMount() {
    const { patientId } = this.state;
    if (patientId) {
      const patient = patientDetailsData.find(p => p.id === parseInt(patientId));
      this.setState({ patient });
    }
  }

  bookAppointment = () => {
    const { patient } = this.state;
    this.props.history.push({
      pathname: '/bookAppointment',
      state: { preSelectedPatient: patient.name }
    });
  }

  shareReport = (reportId) => {
    // In a real app, this would open a sharing dialog
    alert(`Sharing report ${reportId}`);
  }

  downloadReport = (reportId) => {
    // In a real app, this would download the report
    alert(`Downloading report ${reportId}`);
  }

  render() {
    const { patient } = this.state;

    if (!patient) {
      return (
        <NavBar activecomponent={CONSTANTS.ALL_PATIENTS}>
          <ContentContainer>
            <Title>Patient Not Found</Title>
            <p>The requested patient could not be found.</p>
          </ContentContainer>
        </NavBar>
      );
    }

    return (
      <NavBar activecomponent={CONSTANTS.ALL_PATIENTS}>
        <ContentContainer>
          <Title>Patient Details</Title>
          
          <PatientInfo>
            <InfoRow>
              <InfoLabel>Name:</InfoLabel>
              <InfoValue>{patient.name}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Age:</InfoLabel>
              <InfoValue>{patient.age}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Gender:</InfoLabel>
              <InfoValue>{patient.gender}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Contact:</InfoLabel>
              <InfoValue>{patient.contact}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Email:</InfoLabel>
              <InfoValue>{patient.email}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Address:</InfoLabel>
              <InfoValue>{patient.address}</InfoValue>
            </InfoRow>
          </PatientInfo>
          
          <SectionTitle>Medical Reports</SectionTitle>
          
          <ReportsList>
            {patient.reports && patient.reports.length > 0 ? (
              patient.reports.map((report, index) => (
                <ReportCard key={index}>
                  <ReportHeader>
                    <ReportTitle>{report.id}</ReportTitle>
                    <ReportDate>{report.date}</ReportDate>
                  </ReportHeader>
                  
                  <ReportSection>
                    <ReportSectionTitle>Diagnosis</ReportSectionTitle>
                    <ReportContent>{report.diagnosis}</ReportContent>
                  </ReportSection>
                  
                  {report.symptoms && (
                    <ReportSection>
                      <ReportSectionTitle>Symptoms</ReportSectionTitle>
                      <ReportContent>{report.symptoms}</ReportContent>
                    </ReportSection>
                  )}
                  
                  {report.treatment && (
                    <ReportSection>
                      <ReportSectionTitle>Treatment</ReportSectionTitle>
                      <ReportContent>{report.treatment}</ReportContent>
                    </ReportSection>
                  )}
                  
                  {report.notes && (
                    <ReportSection>
                      <ReportSectionTitle>Notes</ReportSectionTitle>
                      <ReportContent>{report.notes}</ReportContent>
                    </ReportSection>
                  )}
                  
                  <ButtonGroup>
                    <ActionButton onClick={() => this.downloadReport(report.id)}>
                      <FaFilePdf /> Download
                    </ActionButton>
                    <ActionButton onClick={() => this.shareReport(report.id)}>
                      <FaShare /> Share
                    </ActionButton>
                  </ButtonGroup>
                </ReportCard>
              ))
            ) : (
              <NoReportsMessage>No medical reports available for this patient.</NoReportsMessage>
            )}
          </ReportsList>
          
          <ButtonGroup style={{ marginTop: '30px' }}>
            <ActionButton onClick={this.bookAppointment}>
              <FaCalendarPlus /> Book Appointment
            </ActionButton>
          </ButtonGroup>
        </ContentContainer>
      </NavBar>
    );
  }
}

export default withRouter(PatientDetails); 
