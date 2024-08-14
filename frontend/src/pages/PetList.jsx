import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePet, fetchPetById, fetchPets } from "../redux/slice/petSlice";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import PetModals from "../components/PetModals";
import { BsEyeFill } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { IoCallOutline } from "react-icons/io5";
import { FcDeleteDatabase } from "react-icons/fc";
import { FiDelete } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import Swal from 'sweetalert2';

function PetList() {
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.pet?.pets || []);
  const currentUser = useSelector((state) => state.auth?.currentUser || null);
  const status = useSelector((state) => state.pet?.status || "idle");
  const error = useSelector((state) => state.pet?.error || null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }
  const handleShow = (mode, pet = null) => {
    setModalMode(mode);
    setSelectedPet(pet);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleDelete = (pet) => {
    console.log("===Pet Delete==",pet)
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${pet.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePet(pet.petId));
        Swal.fire('Deleted!', `${pet.name} has been deleted.`, 'success');
      }
    });
  };

  return (
    <>
      <PetModals
        show={showModal}
        handleClose={handleClose}
        mode={modalMode}
        pet={selectedPet}
      />

      <Container className="mt-5">
        {pets.length === 0 ? (
          <p>No pets available.</p>
        ) : (
          <Row className="p-0 m-0">
            {pets.map((pet) => (
              <Col key={pet.petId} xs={12} md={4} lg={4} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={`http://localhost:8080/uploads/${pet.imageUrl}`}
                    alt={pet.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="text-center">{pet.name}</Card.Title>
                    <Card.Text className="text-muted text-center">
                      {pet.description}
                    </Card.Text>
                    <div className="mt-auto d-flex justify-content-center gap-2">
                      <Button onClick={() => handleShow("view", pet)}>
                        <BsEyeFill />
                      </Button>
                      <a href={`tel:${pet.contactIn}`}>
                        <Button variant="primary"> <IoCallOutline /></Button>
                      </a>
                    
                      {pet.user?.userId === currentUser?.userId && (
                        <>
                        <Button onClick={() => handleShow("edit", pet)}>
                          <BiEditAlt />
                        </Button>
                         <Button onClick={() => handleDelete(pet)}>
                         <MdDeleteOutline/>
                       </Button>
                       </>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}

export default PetList;
