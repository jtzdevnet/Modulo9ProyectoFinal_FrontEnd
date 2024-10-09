import React from 'react'
import { updateUserByIdService } from '../../../Services/userServices';

const FormEditUsers = ({dt_object}) => {
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
            const response = await updateUserByIdService(token,formObject,element_id);
            if (response.status === 200 || response.status === 201) {
                const data = response.data;
                e.target.parentNode.querySelector('.alert-danger').classList.add('hidden');
                e.target.parentNode.querySelector('.alert-success').classList.remove('hidden');
                dt_object.current.dt().ajax.reload();
                console.log('User edit successful', data);
            }
            else{
                e.target.parentNode.querySelector('.alert-danger').classList.remove('hidden');
                e.target.parentNode.querySelector('.alert-success').classList.add('hidden');
                throw new Error('Failed to submit User edit');
            }
        } catch (err) {
            e.target.parentNode.querySelector('.alert-danger').classList.remove('hidden');
            e.target.parentNode.querySelector('.alert-success').classList.add('hidden');
            console.error(err);
        }
        
    };

  return (
    <div>
        <form id="editUserForm" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="name" name="name" />
            </div>
             <div className="mb-3">
                <label htmlFor="lastname" className="form-label">Apellido</label>
                <input type="text" className="form-control" id="lastname" name="lastname" />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name="email" />
            </div>
            <div className="mb-3">
                <label htmlFor="birthdate" className="form-label">Fecha de Nacimiento</label>
                <input type="date" className="form-control" id="birthdate" name="birthdate" />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Telefono</label>
                <input type="text" className="form-control" id="phone" name="phone" />
            </div>
            <div className="mb-3">
                <label htmlFor="user_types_id" className="form-label">Tipo de Usuario</label>
                <select name="user_types_id" className="form-select" id="user_types_id">
                    <option value="">Selecciona una opcion</option>
                    <option value="1">Admin</option>
                    <option value="2">Regular</option>
                </select>
            </div>
        </form>
        <div className="alert alert-success hidden" role="alert">
            Usuario editado correctamente.
        </div>
        <div className="alert alert-danger hidden" role="alert">
            Hubo un error al editar usuario.
        </div>
    </div>
  )
}

export default FormEditUsers