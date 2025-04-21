import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import { adminDetailsData } from "./data.js";
import Button from "../components/Button.jsx";
import { FaUserCircle } from "react-icons/fa"; // User icon

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

const ProfileImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ddd;
`;

const DefaultIcon = styled(FaUserCircle)`
  font-size: 120px;
  color: #ccc;
`;

const UploadInput = styled.input`
  display: none;
`;

const UploadLabel = styled.label`
  display: inline-block;
  padding: 8px 12px;
  background: #0077B6;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-top: -10px;
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
  gap: 15px;
  margin-top: 20px;
`;

class ViewProfile extends Component {
  constructor(props) {
    super(props);
    const admin = adminDetailsData.getCurrentUser() || {};
    const storedImage = localStorage.getItem(`profileImage_${admin.email}`);

    this.state = {
      admin,
      profileImage: storedImage || "",
    };
  }

  handleClose = () => {
    this.props.history.push("/allPatients");
  };

  handleEdit = () => {
    this.props.history.push("/editUser");
  };

  handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const { admin } = this.state;
        const imageKey = `profileImage_${admin.email}`;

        this.setState({ profileImage: reader.result });
        localStorage.setItem(imageKey, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  render() {
    const { admin, profileImage } = this.state;

    return (
      <PageWrapper>
        <NavBar />
        <Container>
          <FormWrapper>
            <Title>View Profile</Title>

            {/* Profile Image or Default Icon */}
            <ProfileImageContainer>
              {profileImage ? (
                <ProfileImage src={profileImage} alt="Profile" />
              ) : (
                <DefaultIcon />
              )}
            </ProfileImageContainer>

            {/* Upload Button */}
            {/* <UploadLabel htmlFor="fileInput">Upload Image</UploadLabel>
            <UploadInput type="file" id="fileInput" accept="image/*" onChange={this.handleImageUpload} /> */}

            {/* Profile Details */}
            <InfoRow>Name: {admin.name || "N/A"}</InfoRow>
            <InfoRow>Email: {admin.email || "N/A"}</InfoRow>
            <InfoRow>Specialisation: {admin.specialization || "N/A"}</InfoRow>
            <InfoRow>License Number: {admin.licenseNo || "N/A"}</InfoRow>
            <InfoRow>Mobile Number: {admin.mobileNo || "N/A"}</InfoRow>

            {/* Action Buttons Centered */}
            <ButtonGroup>
              <Button onClick={this.handleEdit}>Edit Profile</Button>
              <Button onClick={this.handleClose}>Close</Button>
            </ButtonGroup>
          </FormWrapper>
        </Container>
      </PageWrapper>
    );
  }
}

export default withRouter(ViewProfile);
