import React from 'react'
import { createAmenityService } from '../../../Services/amenitiesServices';

const FormAmenities = ({dt_object}) => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const token = localStorage.getItem('token');
        // formData.append("user_id", props.userId);
        // formData.append("venue_id", props.venueId);
        // formData.append("event_hours", eventHours);
        // formData.delete("event_hours1");
        // formData.delete("event_hours2");
        var formObject = {};
        formData.forEach(function(value, key){
            formObject[key] = value;
        });
        var formJson = JSON.stringify(formObject);
        //console.log(formJson);
        console.log(formObject);
            
        try {
            const response = await createAmenityService(token,formObject);
            if (response.status === 200 || response.status === 201) {
                const data = response.data;
                e.target.parentNode.querySelector('.alert-danger').classList.add('hidden');
                e.target.parentNode.querySelector('.alert-success').classList.remove('hidden');
                dt_object.current.dt().ajax.reload();
                console.log('Amenity creation successful', data);
            }
            else{
                e.target.parentNode.querySelector('.alert-danger').classList.remove('hidden');
                e.target.parentNode.querySelector('.alert-success').classList.add('hidden');
                throw new Error('Failed to submit amenity creation');
            }
        } catch (err) {
            e.target.parentNode.querySelector('.alert-danger').classList.remove('hidden');
            e.target.parentNode.querySelector('.alert-success').classList.add('hidden');
            console.error(err);
        }
        
    };

    return (
        <div>
            <form id="createAmenitiesForm" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="name" name="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="icon" className="form-label">Icono</label>
                    <input type="text" className="form-control" id="icon" name="icon" />
                </div>
            </form>
            <div className="alert alert-success hidden" role="alert">
                Amenidad creada correctamente.
            </div>
            <div className="alert alert-danger hidden" role="alert">
                Hubo un error al crear amenidad.
            </div>
        </div>
    )
}

export default FormAmenities