import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

function LoginModal({ show, handleClose }) {
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(login(data)); // Ensure dispatch returns a promise if using middleware like thunk
    handleClose(); // Close the modal on successful login
    navigate("/"); // Redirect to home page after login
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} className="p-3">
            <Form.Group controlId="formUsername">
              {/* <Form.Label>Email</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Username"
                {...register("username", {
                  required: "Username is required",
                })}
              />
              {errors.email && (
                <p className="text-danger">{errors.username.message}</p>
              )}
            </Form.Group>

            <Form.Group controlId="formPassword" className="pt-3 pb-3">
              {/* <Form.Label>Password</Form.Label> */}
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-danger">{errors.password.message}</p>
              )}
            </Form.Group>
            <div className="text-center pt-4">
              <Button
                variant="primary"
                type="submit"
                style={{ width: "150px" }}
              >
                Login
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginModal;
