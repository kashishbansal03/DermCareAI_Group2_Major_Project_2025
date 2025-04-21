import React, { useState } from "react";
import Medilogo from "../images/Medi-Logo.png";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { NavLink as ReactLink } from "react-router-dom";
import { FaUser, FaHospitalAlt, FaCalendarPlus, FaClipboardList, FaBars, FaUsers, FaCamera } from "react-icons/fa";
import { CONSTANTS } from "./constants";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeNav, setActiveNav] = useState(props.activecomponent);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="app-container">
      <button className="sidebar-toggle" onClick={toggle}>
        <FaBars />
      </button>

      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="brand">
          <img src={Medilogo} alt="logo" className="brand-logo" />
          {isOpen && <span className="brand-text">DermCareAI</span>}
        </div>

        <Nav vertical className="sidebar-nav">
          <NavItem>
            <ReactLink
              onClick={() => setActiveNav(CONSTANTS.ADD_PATIENT)}
              className={`nav-link ${activeNav === CONSTANTS.ADD_PATIENT ? "active-link" : ""}`}
              to="/addPatient"
            >
              <FaHospitalAlt />
              {isOpen && <span>Add Patient</span>}
            </ReactLink>
          </NavItem>
          <NavItem>
            <ReactLink
              onClick={() => setActiveNav(CONSTANTS.ALL_PATIENTS)}
              className={`nav-link ${activeNav === CONSTANTS.ALL_PATIENTS ? "active-link" : ""}`}
              to="/allPatients"
            >
              <FaUsers />
              {isOpen && <span>All Patients</span>}
            </ReactLink>
          </NavItem>
          <NavItem>
            <ReactLink
              onClick={() => setActiveNav(CONSTANTS.BOOK_APPOINTMENT)}
              className={`nav-link ${activeNav === CONSTANTS.BOOK_APPOINTMENT ? "active-link" : ""}`}
              to="/bookAppointment"
            >
              <FaCalendarPlus />
              {isOpen && <span>Book Appointment</span>}
            </ReactLink>
          </NavItem>
          <NavItem>
            <ReactLink
              onClick={() => setActiveNav(CONSTANTS.ALL_APPOINTMENTS)}
              className={`nav-link ${activeNav === CONSTANTS.ALL_APPOINTMENTS ? "active-link" : ""}`}
              to="/allAppointments"
            >
              <FaClipboardList />
              {isOpen && <span>All Appointments</span>}
            </ReactLink>
          </NavItem>
          <NavItem>
            <ReactLink
              onClick={() => setActiveNav(CONSTANTS.SCREENING)}
              className={`nav-link ${activeNav === CONSTANTS.SCREENING ? "active-link" : ""}`}
              to="/screening"
            >
              <FaCamera />
              {isOpen && <span>Screening</span>}
            </ReactLink>
          </NavItem>
          
          <div className="user-section">
            <UncontrolledDropdown nav>
              <DropdownToggle nav caret className="nav-link">
                <FaUser />
                {isOpen && <span>User</span>}
              </DropdownToggle>
              <DropdownMenu className="custom-dropdown">
                <DropdownItem>
                  <ReactLink className="dropdown-link" to="/viewProfile">
                    View Profile
                  </ReactLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <ReactLink className="dropdown-link" to="/">
                    Logout
                  </ReactLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </Nav>
      </div>

      <div className={`main-content ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {props.children}
      </div>

      <style>
        {`
          .app-container {
            display: flex;
            min-height: 100vh;
          }

          .sidebar-toggle {
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 1030;
            background: transparent;
            border: none;
            color: #023E8A;
            font-size: 24px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.9);
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }
        
        .sidebar.open ~ .sidebar-toggle {
            left: 270px;
        }
        
        .sidebar.closed ~ .sidebar-toggle {
            left: 90px;
        }
          .sidebar {
            position: fixed;
            left: 0;
            top: 0;
            height: 100vh;
            background: linear-gradient(135deg, #023E8A, #0077B6);
            transition: all 0.3s ease;
            z-index: 1020;
            overflow-y: auto;
            box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
          }

          .sidebar.open {
            width: 250px;
          }

          .sidebar.closed {
            width: 70px;
          }

          .brand {
    display: flex;
    align-items: center;
    padding: 20px;
    color: white;
    height: 80px; // Fixed height for brand section
    margin-top: 20px;
  }


          .brand-logo {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: white;
            padding: 5px;
            object-fit: contain;
            display: block;
          }

          .brand-text {
            margin-left: 10px;
            font-size: 1.2rem;
            font-weight: bold;
            white-space: nowrap;
          }

          .sidebar-nav {
            padding: 20px 0;
            height: calc(100% - 80px);
            display: flex;
            flex-direction: column;
          }

          .nav-link {
            display: flex;
            align-items: center;
            color: white;
            padding: 12px 20px;
            text-decoration: none;
            transition: all 0.3s;
            white-space: nowrap;
          }

          .nav-link svg {
            font-size: 20px;
            min-width: 30px;
          }

          .nav-link span {
            margin-left: 10px;
          }

          .nav-link:hover, .active-link {
            background: rgba(255, 255, 255, 0.1);
            color: white;
          }

          .user-section {
            margin-top: auto;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 20px;
          }

          .custom-dropdown {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }

          .dropdown-link {
            color: #023E8A;
            text-decoration: none;
            display: block;
            padding: 8px 20px;
            transition: all 0.3s ease;
          }

          .dropdown-link:hover {
            background: linear-gradient(135deg, #023E8A, #0077B6);
            color: white;
            text-decoration: none;
          }

          .main-content {
            flex: 1;
            transition: all 0.3s ease;
            padding: 20px;
            margin-left: 70px;
            display: flex;
            justify-content: center;
            width: calc(100% - 70px);
          }

          .main-content.sidebar-open {
            margin-left: 250px;
            width: calc(100% - 250px);
          }

          .main-content.sidebar-closed {
            margin-left: 70px;
            width: calc(100% - 70px);
          }

          @media (max-width: 768px) {
    .sidebar-toggle {
      left: 20px; // Keep toggle button at left on mobile
      top: 20px;
    }

            .main-content {
              margin-left: 0;
              padding-top: 80px;
              width: 100%;
            }

            .main-content.sidebar-open {
              margin-left: 0;
              width: 100%;
            }

            .main-content.sidebar-closed {
              margin-left: 0;
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default NavBar;
