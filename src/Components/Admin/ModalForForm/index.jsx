import React, {useEffect, useState} from 'react'
import FormUsers from '../FormUsers'
import FormVenues from '../FormVenues'
import FormAmenities from '../FormAmenities'

import FormEditUsers from '../FormEditUsers'
import FormEditVenues from '../FormEditVenues'
import FormEditAmenities from '../FormEditAmenities'
import './index.scss'

import { getUserByIdService } from '../../../Services/userServices';
import { getVenueByIdService } from "../../../Services/venueServices";
import { getAmenityByIdService } from '../../../Services/amenitiesServices';

import { deleteUserByIdService } from "../../../Services/userServices";
import { deleteVenueByIdService } from "../../../Services/venueServices";
import { deleteAmenityByIdService } from "../../../Services/amenitiesServices";

const ModalForForm = ({form, form_title, modal_id, form_id, dt_object}) => {

    const [elementId, setElementId] = useState();
    const token = localStorage.getItem('token');

    
    useEffect(() => {
        const myModalEl = document.getElementById(modal_id);

        myModalEl.addEventListener('show.bs.modal', async event => {
            const button = event.relatedTarget;
            const element_id = button.getAttribute('data-bs-element-id');
            if(element_id && form=='editAmenitiesForm'){
                setElementId(element_id);
                console.log(element_id);
                try {
                    const response = await getAmenityByIdService(token,element_id);
                    if (response.status === 200 || response.status === 201) {
                        const data = response.data;
                        document.querySelector('#editAmenitiesForm #name').value = data.name;
                        document.querySelector('#editAmenitiesForm #icon').value = data.icon;
                        document.querySelector('#editAmenitiesForm').setAttribute('data-bs-element-id', element_id);
                    }
                    else{
                        throw new Error('Failed to print data');
                    }
                } catch (err) {
                    console.error(err);
                }
            }

            if(element_id && form=='editUserForm'){
                setElementId(element_id);
                console.log(element_id);
                try {
                    const response = await getUserByIdService(token,element_id);
                    if (response.status === 200 || response.status === 201) {
                        const data = response.data;
                        console.log(data.birthdate);
                        document.querySelector('#editUserForm #name').value = data.name;
                        document.querySelector('#editUserForm #lastname').value = data.lastname;
                        document.querySelector('#editUserForm #email').value = data.email;
                        document.querySelector('#editUserForm #birthdate').value = data.birthdate.substring(0,data.birthdate.indexOf("T"));
                        document.querySelector('#editUserForm #phone').value = data.phone;
                        document.querySelector('#editUserForm #user_types_id').value = data.user_types_id;
                        document.querySelector('#editUserForm').setAttribute('data-bs-element-id', element_id);
                    }
                    else{
                        throw new Error('Failed to print data');
                    }
                } catch (err) {
                    console.error(err);
                }
            }

            if(element_id && form=='editVenuesForm'){
                setElementId(element_id);
                console.log(element_id);
                try {
                    const response = await getVenueByIdService(token,element_id);
                    if (response.status === 200 || response.status === 201) {
                        const data = response.data;
                        
                        document.querySelector('#editVenuesForm #name').value = data[0].name;
                        document.querySelector('#editVenuesForm #address').value = data[0].address;
                        document.querySelector('#editVenuesForm #postal_code').value = data[0].postal_code;
                        document.querySelector('#editVenuesForm #city').value = data[0].city;
                        document.querySelector('#editVenuesForm #state').value = data[0].state;
                        document.querySelector('#editVenuesForm #coordinates').value = data[0].coordinates;
                        document.querySelector('#editVenuesForm #description').value = data[0].description;
                        document.querySelector('#editVenuesForm #price').value = data[0].price;
                        document.querySelector('#editVenuesForm #capacity').value = data[0].capacity;
                        document.querySelector('#editVenuesForm #opening_hours').value = data[0].opening_hours;
                        document.querySelector('#editVenuesForm #closing_hours').value = data[0].closing_hours;
                        
                        document.querySelector('#editVenuesForm').setAttribute('data-bs-element-id', element_id);
                    }
                    else{
                        throw new Error('Failed to print data');
                    }
                } catch (err) {
                    console.error(err);
                }
            }
            
        })

        myModalEl.addEventListener('hidden.bs.modal', event => {
            console.log('Modal cerrado');
            myModalEl.querySelector('form').style.display='block';
            myModalEl.querySelector('.alert-dark').classList.add('hidden');
            myModalEl.querySelector('.alert-danger').classList.add('hidden');
            myModalEl.querySelector('.alert-success').classList.add('hidden');
        })
    }, []);

    const deleteElement = async (e) => {
        e.preventDefault();
        if(confirm("¿Deseas borrar este elemento?")){
            console.log('deleted');
            console.log(e.currentTarget.dataset.currentForm);
            const element_form = e.currentTarget.dataset.currentForm;
            const element_id = document.querySelector(`#${element_form}`).dataset.bsElementId;
            if(element_id && form=='editAmenitiesForm'){
                try {
                    const response = await deleteAmenityByIdService(token,element_id);
                    if (response.status === 200 || response.status === 201) {
                        const data = response.data;
                        document.querySelector(`#${element_form}`).style.display = 'none';
                        document.querySelector(`#${modal_id} .alert-dark`).classList.remove('hidden');
                        dt_object.current.dt().ajax.reload();
                    }
                    else{
                        throw new Error('Failed to print data');
                    }
                } catch (err) {
                    console.error(err);
                }
            }
            if(element_id && form=='editVenuesForm'){
                try {
                    const response = await deleteVenueByIdService(token,element_id);
                    if (response.status === 200 || response.status === 201) {
                        const data = response.data;
                        document.querySelector(`#${element_form}`).style.display = 'none';
                        document.querySelector(`#${modal_id} .alert-dark`).classList.remove('hidden');
                        dt_object.current.dt().ajax.reload();
                    }
                    else{
                        throw new Error('Failed to print data');
                    }
                } catch (err) {
                    console.error(err);
                }
            }
            if(element_id && form=='editUserForm'){
                try {
                    const response = await deleteUserByIdService(token,element_id);
                    if (response.status === 200 || response.status === 201) {
                        const data = response.data;
                        document.querySelector(`#${element_form}`).style.display = 'none';
                        document.querySelector(`#${modal_id} .alert-dark`).classList.remove('hidden');
                        dt_object.current.dt().ajax.reload();
                    }
                    else{
                        throw new Error('Failed to print data');
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        }
    };

  return (
    <div className="modal modal-lg fade" id={modal_id} tabIndex="-1" aria-labelledby={modal_id} aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id={modal_id}>{form_title}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                { form == 'userForm' ? <FormUsers dt_object={dt_object} /> : null }
                { form == 'venuesForm' ? <FormVenues dt_object={dt_object} /> : null }
                { form == 'amenitiesForm' ? <FormAmenities dt_object={dt_object} /> : null }
                { form == 'editAmenitiesForm' ? <FormEditAmenities dt_object={dt_object} /> : null }
                { form == 'editUserForm' ? <FormEditUsers dt_object={dt_object} /> : null }
                { form == 'editVenuesForm' ? <FormEditVenues dt_object={dt_object} /> : null }
                <div className="alert alert-dark hidden" role="alert">
                    Este elemento fue eliminado.
                </div>
            </div>
            <div className="modal-footer">
                { form == 'editAmenitiesForm' || form == 'editUserForm' || form == 'editVenuesForm' ? <button type="button" className="btn btn-danger" data-current-modal={modal_id} data-current-form={form} onClick={deleteElement}><i className="bi bi-trash-fill"></i> Eliminar</button> : ''}
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" form={form_id} className="btn btn-primary">Guardar</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default ModalForForm