import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Image } from 'react-bootstrap';

const PetForm = ({ onSubmit, defaultValues, mode }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: defaultValues || {}
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control 
          type="text" 
          {...register('name', { required: 'Name is required' })} 
          isInvalid={!!errors.name} 
          disabled={mode === 'view'}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={3} 
          {...register('description')} 
          disabled={mode === 'view'}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Last Seen Location</Form.Label>
        <Form.Control 
          type="text" 
          {...register('lastSeenLocation')} 
          disabled={mode === 'view'}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date Missing</Form.Label>
        <Form.Control 
          type="date" 
          {...register('lastSeenDate')} 
          disabled={mode === 'view'}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Contact Information</Form.Label>
        <Form.Control 
          type="text" 
          {...register('contactInfo')} 
          disabled={mode === 'view'}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Photo</Form.Label><br></br>
        {mode !== 'view' ? (
          <Form.Control type="file" {...register('imageUrl')} />
        ) : (
          <Image src={`http://localhost:8080/uploads/${defaultValues.imageUrl}`} alt={defaultValues.name} fluid />
        )}
      </Form.Group>

      {mode !== 'view' && (
        <div className="d-flex justify-content-end">
          <Button type="submit" variant="success">Submit</Button>
        </div>
      )}
    </Form>
  );
};

export default PetForm;
