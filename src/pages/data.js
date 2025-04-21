function patientsDetails() {
  this.patDetails = {};
}

function appointmentDetails() {
  this.appDetails = {};
}

function administratorDetails() {
  this.currentUserId = undefined;
  this.adminDetails = {};
}

patientsDetails.prototype.add = function(
  name, age, gender, phone, email, address, medicalHistory, allergies, medications, dob, location, mobile
) {
  var id = (Object.keys(this.patDetails).length > 0) ? Math.max(...Object.keys(this.patDetails).map(Number)) + 1 : 1;

  const newUser = {
    id,
    name,
    age,
    gender,
    phone,
    email,
    address,
    medicalHistory,
    allergies,
    medications,
    dob,
    location,
    mobile,
    reports: [] // Initialize reports array
  };

  this.patDetails[id] = newUser;
};

patientsDetails.prototype.edit = function(
  id, name, age, gender, phone, email, address, medicalHistory, allergies, medications, dob, location, mobile
) {
  id = parseInt(id); // Ensure ID is a number
  if (!this.patDetails[id]) {
    console.warn(`Patient with ID ${id} not found!`);
    return;
  }

  this.patDetails[id] = {
    ...this.patDetails[id], // Keep existing data
    name,
    age,
    gender,
    phone,
    email,
    address,
    medicalHistory,
    allergies,
    medications,
    dob,
    location,
    mobile,
  };
};

patientsDetails.prototype.getData = function() {
  return Object.values(this.patDetails);
};

patientsDetails.prototype.getName = function() {
  return Object.values(this.patDetails).map(patient => patient.name);
};

patientsDetails.prototype.getPatientDetails = function(id) {
  return this.patDetails[id] || undefined;
};

patientsDetails.prototype.viewPatientDetails = function(id) {
  console.log("Fetching Patient:", this.patDetails[id]); // Debugging log
  return this.patDetails[id] || undefined;
};

patientsDetails.prototype.deletePatient = function(id) {
  delete this.patDetails[id];
};

// **AppointmentDetails Methods**
appointmentDetails.prototype.add = function(name, appType, appdate, slot, notes) {
  const appId = Object.keys(this.appDetails).length + 1 || 1;
  const formattedDate = new Date(appdate);
  const day = String(formattedDate.getDate()).padStart(2, '0');
  const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
  const year = formattedDate.getFullYear();
  const dateString = `${day}/${month}/${year}`;
  
  // Combine date and time slot
  const fullSlot = `${dateString} ${slot}`;
  
  this.appDetails[appId] = {
    appId,
    name,
    appType,
    appdate,
    slot,
    notes,
  };
};

appointmentDetails.prototype.edit = function(appId, name, appType, appdate, slot, notes) {
  this.appDetails[appId] = {
    appId,
    name,
    appType,
    appdate,
    slot,
    notes,
  };
};

appointmentDetails.prototype.getData = function() {
  return Object.values(this.appDetails);
};

appointmentDetails.prototype.getAppointmentDetails = function(appId) {
  return this.appDetails[appId] || undefined;
};

appointmentDetails.prototype.viewAppointmentDetails = function(appId) {
  return this.appDetails[appId] || undefined;
};

appointmentDetails.prototype.deleteAppointment = function(appId) {
  delete this.appDetails[appId];
};

administratorDetails.prototype.add = function(name, email, licenseNo, specialization, mobileNo, password) {
  var adminId = Object.keys(this.adminDetails).length + 1 || 1;
  this.adminDetails[adminId] = {
    adminId,
    name,
    email,
    licenseNo,
    specialization,
    mobileNo,
    password
  };
  this.currentUserId = adminId; // Automatically set the new user as current user
};

administratorDetails.prototype.getData = function() {
  return Object.values(this.adminDetails) || [];
};

administratorDetails.prototype.getCurrentUser = function() {
  if (this.currentUserId) {
    return this.adminDetails[this.currentUserId];
  }
  return undefined;
};

administratorDetails.prototype.setCurrentUser = function(adminId) {
  this.currentUserId = adminId;
};

export const patientDetailsData = new patientsDetails();
export const appDetailsData = new appointmentDetails();
export const adminDetailsData = new administratorDetails();
