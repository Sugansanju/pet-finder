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
          {...register('description',{ required: 'Description is required' })} 
          isInvalid={!!errors.description} 
          disabled={mode === 'view'}
        />
         <Form.Control.Feedback type="invalid">
          {errors.description?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Last Seen Location</Form.Label>
        <Form.Control 
          type="text" 
          {...register('lastSeenLocation',{ required: 'Location is required' })} 
          isInvalid={!!errors.lastSeenLocation} 

          disabled={mode === 'view'}
        />
         <Form.Control.Feedback type="invalid">
          {errors.lastSeenLocation?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date Missing</Form.Label>
        <Form.Control 
          type="date" 
          {...register('lastSeenDate',{ required: 'Date is required' })} 
          isInvalid={!!errors.lastSeenDate} 

          disabled={mode === 'view'}
        />
         <Form.Control.Feedback type="invalid">
          {errors.lastSeenDate?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Contact Information</Form.Label>
        <Form.Control 
          type="text" 
          {...register('contactInfo' ,{ required: 'Contact is required',
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Invalid Contact, must be 10 digits",
            },
           })} 
           isInvalid={!!errors.contactInfo} 

          disabled={mode === 'view'}
        />
         <Form.Control.Feedback type="invalid">
          {errors.contactInfo?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Photo</Form.Label><br></br>
        {mode !== 'view' ? (
          <Form.Control type="file" {...register('imageUrl',{ required: 'Photo is required' })}            
          isInvalid={!!errors.imageUrl} 
          />
        ) : (
          <Image src={`http://localhost:8080/uploads/${defaultValues.imageUrl}`} alt={defaultValues.name} fluid />
        )}
         <Form.Control.Feedback type="invalid">
          {errors.imageUrl?.message}
        </Form.Control.Feedback>
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
