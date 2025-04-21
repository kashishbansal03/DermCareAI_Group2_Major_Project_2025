import React, { useState, Fragment } from "react";
import styled, { keyframes } from "styled-components";
import NavBar from "./NavBar.jsx";
import { CONSTANTS } from "./constants.js";
import Button from "../components/Button.jsx";
import { FiCamera } from "react-icons/fi";
import { api } from "../services/api.js";
import { patientDetailsData } from "./data.js";
import { withRouter } from 'react-router-dom';
const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
  margin-top: 60px; // Add this to prevent overlap with the warning header
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
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  text-align: center;

`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #0077b6;
`;

const FileInputLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border: 2px dashed #004080;
  border-radius: 10px;
  background: #f9fcff;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #e6f4ff;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const CameraIcon = styled(FiCamera)`
  font-size: 40px;
  color: #0077b6;
  margin-bottom: 10px;
`;

const FileName = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #555;
`;

const ResultBox = styled.div`
  margin-top: 15px;
  padding: 15px;
  background: ${({ success }) => (success ? "#dff0d8" : "#f8d7da")};
  border-left: 4px solid ${({ success }) => (success ? "#3c763d" : "#a94442")};
  border-radius: 8px;
  text-align: left;
  color: ${({ success }) => (success ? "#3c763d" : "#a94442")};
  font-weight: 500;
  white-space: pre-line;
  line-height: 1.5;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 300px;
  margin-top: 10px;
  border-radius: 8px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 15px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 15px;
  resize: vertical;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 15px;
`;

const slideAnimation = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

const WarningHeader = styled.div`
  color: red;
  text-align: center;
  padding: 12px;
  font-size: 20px;
  font-weight: bold;
  background-size: 200% 100%;
  animation: ${slideAnimation} 15s linear infinite;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  white-space: nowrap;
`;

const Screening = (props) => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [processedImage, setProcessedImage] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [doctorNotes, setDoctorNotes] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setResult(""); // Reset result when a new file is selected

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImagePreview(null);
    }
  };

  const handleUpload = async () => {
    if (file && selectedPatient) {
      setLoading(true);
      try {
        const result = await api.analyzeSkinImage(file);
        const processedImageUrl = `data:image/png;base64,${result.visualization}`;
        setProcessedImage(processedImageUrl);
        const recommendations = api.getRecommendations(result.class_name);
        const analysisResult = {
          condition: result.class_name,
          confidence: result.confidence,
          model: result.model_used,
          visualization: processedImageUrl,
          recommendations: recommendations,
        };
        setResult(analysisResult);

        const patient = patientDetailsData.getPatientDetails(selectedPatient);
        if (patient) {
          patient.reports.push({
            image: file,
            processedImage: processedImageUrl,
            recommendations,
            doctorNotes: doctorNotes,
          });
        }
      } catch (error) {
        setResult(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    } else {
      setResult("Please select a patient and upload an image.");
    }
  };

  const handleBookAppointment = () => {
    props.history.push(`/bookAppointment?notes=${encodeURIComponent(doctorNotes)}`);
  }; 

  const handleShareReport = () => {
    alert("Report shared successfully");
  };

  return (
    <React.Fragment>
    <WarningHeader>
      DISCLAIMER: For Major Project – Not Clinically Tested
    </WarningHeader>
    <PageWrapper>
      <NavBar activecomponent={CONSTANTS.SCREENING} />
      <Container>
        <FormWrapper>
          <Title>Skin Screening</Title>

          <Select onChange={(e) => setSelectedPatient(e.target.value)}>
            <option value="">Select a patient</option>
            {patientDetailsData.getData().map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </Select>

          <FileInputLabel>
            <CameraIcon />
            <span>Upload an Image</span>
            <FileInput type="file" accept="image/*" onChange={handleFileChange} />
          </FileInputLabel>

          {imagePreview && <ImagePreview src={imagePreview} alt="Preview" />}

          {file && <FileName>{file.name}</FileName>}

          <TextArea
            placeholder="Doctor's Notes"
            value={doctorNotes}
            onChange={(e) => setDoctorNotes(e.target.value)}
          />

          <ButtonGroup>
            <Button onClick={handleUpload} disabled={loading}>
              {loading ? "Analyzing..." : "Analyze"}
            </Button>
          </ButtonGroup>

          {result && (
  <Fragment>
          {(!result.condition && !result.confidence && !result.model && !result.recommendations) ? (
         <div style={{ 
          marginTop: '30px',
          marginBottom: '30px',
          color: '#dc3545', 
          fontWeight: 'bold',
          fontSize: '16px',
          textAlign: 'center',
          padding: '15px',
          backgroundColor: '#ffebee',
          borderRadius: '8px',
          border: '2px solid #dc3545',
          borderRadius: '8px',
          margin: '15px 0'
        }}>
          Backend not available at the moment. This is a Major Project of Group 2, 2025 – Not clinically tested.
        </div>
      ) : (
    <ResultBox success={!result.error}>
        <Fragment>
          {result.visualization && (
            <div className="mt-4">
              <p className="font-medium mb-2">Visualization:</p>
              <img
                src={result.visualization}
                alt="Analysis visualization"
                className="w-full rounded border border-gray-300"
              />
            </div>
          )}
          <p>Class: {result.condition}</p>
          <p>Confidence: {(result.confidence * 100).toFixed(1)}%</p>
          <p>Model: {result.model}</p>
          <p>Recommendations: {result.recommendations}</p>
        </Fragment>
     
    </ResultBox>
     )}

    <ButtonGroup>
      <Button onClick={handleBookAppointment}>Book Appointment</Button>
      <Button onClick={handleShareReport}>Share Report</Button>
    </ButtonGroup>
  </Fragment>
)}
        </FormWrapper>
      </Container>
    </PageWrapper>
    </React.Fragment>
  );
};

export default withRouter(Screening);
