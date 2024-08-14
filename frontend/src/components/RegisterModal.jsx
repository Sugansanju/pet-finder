import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { userRegister } from "../redux/slice/authSlice";

function RegisterModal({ show, handleClose }) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(userRegister(data));
    handleClose(); // Close the modal on successful registration
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} className="p-3">
            <Form.Group controlId="formUsername" className="pt-3 pb-3">
              <Form.Control
                type="text"
                placeholder="Username"
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                })}
              />
              {errors.username && (
                <p className="text-danger">{errors.username.message}</p>
              )}
            </Form.Group>

            <Form.Group controlId="formEmail" className="pt-3 pb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </Form.Group>

            <Form.Group controlId="formPassword" className="pt-3 pb-3">
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

            <Form.Group controlId="formContact" className="pt-3 pb-3">
              <Form.Control
                type="text"
                placeholder="Mobile number"
                {...register("contact", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid mobile number, must be 10 digits",
                  },
                })}
              />
              {errors.contact && (
                <p className="text-danger">{errors.contact.message}</p>
              )}
            </Form.Group>
            <div className="text-center pt-3">
              <Button variant="primary" type="submit" style={{width:'150px'}}>
                Register
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RegisterModal;
