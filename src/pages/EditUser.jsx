import React, { Component } from "react";
import styled from "styled-components";
import Button from "../components/Button.jsx";
import NavBar from "./NavBar.jsx";
import { adminDetailsData } from "./data.js";
import { FaUserCircle } from "react-icons/fa";

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
  margin-top: 10px;
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
`;

class EditUser extends Component {
  constructor(props) {
    super(props);
    const admin = adminDetailsData.getCurrentUser() || {};
    const storedImage = localStorage.getItem(`profileImage_${admin.email}`);
    
    this.state = {
      name: admin.name || "",
      email: admin.email || "",
      specialization: admin.specialization || "",
      licenseNo: admin.licenseNo || "",
      mobileNo: admin.mobileNo || "",
      admin,
      profileImage: storedImage || "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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

  handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile Updated Successfully!");
    adminDetailsData.add(
      this.state.name,
      this.state.email,
      this.state.licenseNo,
      this.state.specialization,
      this.state.mobileNo,
      this.state.admin.password
    );
    this.props.history.push("/viewProfile");
  };

  handleCancel = () => {
    this.props.history.push("/viewProfile");
  };

  render() {
    const { name, email, specialization, licenseNo, mobileNo, profileImage } = this.state;
    return (
      <PageWrapper>
        <NavBar />
        <Container>
          <FormWrapper>
            <Title>Edit Profile</Title>

            <ProfileImageContainer>
              {profileImage ? (
                <ProfileImage src={profileImage} alt="Profile" />
              ) : (
                <DefaultIcon />
              )}
            </ProfileImageContainer>

            <UploadLabel htmlFor="fileInput">Change Profile Picture</UploadLabel>
            <UploadInput 
              type="file" 
              id="fileInput" 
              accept="image/*" 
              onChange={this.handleImageUpload} 
            />

            <form onSubmit={this.handleSubmit}>
              <FormField>
                <Label>Name *</Label>
                <Input type="text" name="name" value={name} onChange={this.handleChange} />
              </FormField>

              <FormField>
                <Label>Email *</Label>
                <Input type="email" name="email" value={email} onChange={this.handleChange} />
              </FormField>

              <FormField>
                <Label>Specialization *</Label>
                <Input type="text" name="specialization" value={specialization} onChange={this.handleChange} />
              </FormField>

              <FormField>
                <Label>License Number *</Label>
                <Input type="text" name="licenseNo" value={licenseNo} onChange={this.handleChange} />
              </FormField>

              <FormField>
                <Label>Mobile Number *</Label>
                <Input type="text" name="mobileNo" value={mobileNo} onChange={this.handleChange} />
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

export default EditUser;
