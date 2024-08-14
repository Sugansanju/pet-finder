import React, { useState } from "react";
import { Navbar, Container, Offcanvas, Nav, Button, Modal } from "react-bootstrap";
import logo from "../assets/petlog.png";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../redux/slice/authSlice";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import PetForm from "./PetForm";
import axios from 'axios';
import { createPet } from "../redux/slice/petSlice";
function NavbarComp() {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("add"); // 'add', 'edit', 'view'
  const [selectedPet, setSelectedPet] = useState(null);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  const currentUser=useSelector((state)=>state.auth?.currentUser||null)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShow = (mode, pet = null) => {
    setMode(mode);
    setSelectedPet(pet);
    setShow(true);
  };
  const handleClose = () => setShow(false);


  const handleSubmit = async(data) => {
    if (mode === "add") {
      try {
        // Create a FormData object to handle file upload
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('lastSeenLocation', data.lastSeenLocation);
        formData.append('lastSeenDate', data.lastSeenDate);
        formData.append('contactInfo', data.contactInfo);
        formData.append('file', data.imageUrl[0]); // Assuming photo is a file input
  
        // Upload the file
      let img=  await axios.post('http://localhost:8080/pets/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        // Assuming the URL of the uploaded image is returned or stored somewhere
        const imageUrl =img.data;
  
        // Create pet data with image URL
        const petData = {
          ...data,
          userId:currentUser?.userId,
          imageUrl: imageUrl,
        };
  
        // Dispatch the createPet action with form data
        dispatch(createPet(petData));
  
        // Clear form fields
        // reset();
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else if (mode === "edit") {
      // Handle editing an existing pet
    }
    handleClose();
  };

  const goToAddPet = () => {
    navigate("/add");
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // Redirect to login page after logout
  };

  return (
    <>
      <Navbar
        bg="primary"
        data-bs-theme="dark"
        collapseOnSelect
        expand="md"
        className="p-3"
      >
        {/* <Container> */}
        <Navbar.Brand href="/">
          {/* <img
            alt=""
            src={logo}
            width="50"
            height="30"
            className="d-inline-block align-top"
          />{" "} */}
          Pet Finder
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-md"
          aria-labelledby="offcanvasNavbarLabel-expand-md"
          placement="end"
          style={{ background: "#0d6efd" }}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-md"></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {!isAuthenticated ? (
                <>
                  <p style={{ margin: "10px" }}>
                    <Button
                      variant="primary"
                      onClick={() => setLoginOpen(true)}
                    >
                      Login
                    </Button>
                  </p>
                  <p style={{ margin: "10px" }}>
                    <Button
                      variant="secondary"
                      onClick={() => setRegisterOpen(true)}
                    >
                      Register
                    </Button>
                  </p>
                </>
              ) : (
                <>
                  {" "}
                  <p style={{ margin: "10px" }}>
                    <Button variant="primary" onClick={() => handleShow("add")}>
                      Add Pet
                    </Button>
                  </p>
                  <p style={{ margin: "10px" }}>
                    <Button variant="primary" onClick={handleLogout}>
                      Logout
                    </Button>
                  </p>
                </>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        {/* </Container> */}
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {mode === "add"
              ? "Add Pet"
              : mode === "edit"
              ? "Edit Pet"
              : "View Pet"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PetForm
            onSubmit={handleSubmit}
            defaultValues={selectedPet}
            mode={mode}
          />
        </Modal.Body>
      </Modal>
      <LoginModal show={isLoginOpen} handleClose={() => setLoginOpen(false)} />
      <RegisterModal
        show={isRegisterOpen}
        handleClose={() => setRegisterOpen(false)}
      />
    </>
  );
}

export default NavbarComp;
