import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function LoginModal({ show, handleClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authError = useSelector((state) => state.auth.error);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit =  (data) => {
     dispatch(login(data));
      reset();
      handleClose();
      navigate("/");
    
  };

  useEffect(() => {
    if (authError) {
      toast.error(`Login failed: ${authError}`);
    }
  }, [authError]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} className="p-3">
            <Form.Group controlId="formUsername">
              <Form.Control
                type="text"
                placeholder="Username"
                {...register("username", {
                  required: "Username is required",
                })}
              />
              {errors.username && (
                <p className="text-danger">{errors.username.message}</p>
              )}
            </Form.Group>

            <Form.Group controlId="formPassword" className="pt-3 pb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
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
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default LoginModal;
