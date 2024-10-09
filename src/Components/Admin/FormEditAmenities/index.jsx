import React, { useEffect } from 'react'
import { updateAmenityByIdService } from '../../../Services/amenitiesServices';

const FormEditAmenities = ({dt_object}) => {
    const token = localStorage.getItem('token');


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const element_id = e.target.getAttribute('data-bs-element-id');
        var formObject = {};
        formData.forEach(function(value, key){
            formObject[key] = value;
        });
        var formJson = JSON.stringify(formObject);
        //console.log(formJson);
        console.log(formObject);
            
        try {
            const response = await updateAmenityByIdService(token,formObject,element_id);
            if (response.status === 200 || response.status === 201) {
                const data = response.data;
                e.target.parentNode.querySelector('.alert-danger').classList.add('hidden');
                e.target.parentNode.querySelector('.alert-success').classList.remove('hidden');
                dt_object.current.dt().ajax.reload();
                console.log('Amenity edit successful', data);
            }
            else{
                e.target.parentNode.querySelector('.alert-danger').classList.remove('hidden');
                e.target.parentNode.querySelector('.alert-success').classList.add('hidden');
                throw new Error('Failed to submit amenity edit');
            }
        } catch (err) {
            e.target.parentNode.querySelector('.alert-danger').classList.remove('hidden');
            e.target.parentNode.querySelector('.alert-success').classList.add('hidden');
            console.error(err);
        }
        
    };

    return (
        <div>
            <form id="editAmenitiesForm" onSubmit={handleSubmit}>
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
                Amenidad editada correctamente.
            </div>
            <div className="alert alert-danger hidden" role="alert">
                Hubo un error al editar amenidad.
            </div>
        </div>
    )
}

export default FormEditAmenities