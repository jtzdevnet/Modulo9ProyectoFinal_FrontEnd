import React from 'react'
import { createVenueService } from '../../../Services/venueServices';

const FormVenues = ({dt_object}) => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const token = localStorage.getItem('token');
        var formObject = {};
        formData.forEach(function(value, key){
            formObject[key] = value;
        });
        var formJson = JSON.stringify(formObject);
        console.log(formObject);
            
        try {
            const response = await createVenueService(token,formObject);
            if (response.status === 200 || response.status === 201) {
                const data = response.data;
                e.target.parentNode.querySelector('.alert-danger').classList.add('hidden');
                e.target.parentNode.querySelector('.alert-success').classList.remove('hidden');
                dt_object.current.dt().ajax.reload();
                console.log('Venue creation successful', data);
            }
            else{
                e.target.parentNode.querySelector('.alert-danger').classList.remove('hidden');
                e.target.parentNode.querySelector('.alert-success').classList.add('hidden');
                throw new Error('Failed to submit Venue creation');
            }
        } catch (err) {
            e.target.parentNode.querySelector('.alert-danger').classList.remove('hidden');
            e.target.parentNode.querySelector('.alert-success').classList.add('hidden');
            console.error(err);
        }
        
    };

  return (
    <div>
        <form id="createVenuesForm"  onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-6">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="name" name="name" />
                </div>
                <div className="col-6">
                    <label htmlFor="address" className="form-label">Direccion</label>
                    <input type="text" className="form-control" id="address" name="address" />
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <label htmlFor="postal_code" className="form-label">Codigo Postal</label>
                    <input type="text" className="form-control" id="postal_code" name="postal_code" />
                </div>
                <div className="col-6">
                    <label htmlFor="city" className="form-label">Ciudad</label>
                    <input type="text" className="form-control" id="city" name="city" />
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <label htmlFor="state" className="form-label">Estado</label>
                    <select className="form-control" name="state" id="state">
                        <option value="">Selecciona una opcion</option>
                        <option value="Aguascalientes">Aguascalientes</option>
                        <option value="Baja California">Baja California</option>
                        <option value="Baja California Sur">Baja California Sur</option>
                        <option value="Campeche">Campeche</option>
                        <option value="Chiapas">Chiapas</option>
                        <option value="Chihuahua">Chihuahua</option>
                        <option value="Ciudad de México">Ciudad de México</option>
                        <option value="Coahuila">Coahuila</option>
                        <option value="Colima">Colima</option>
                        <option value="Durango">Durango</option>
                        <option value="Estado de México">Estado de México</option>
                        <option value="Guanajuato">Guanajuato</option>
                        <option value="Guerrero">Guerrero</option>
                        <option value="Hidalgo">Hidalgo</option>
                        <option value="Jalisco">Jalisco</option>
                        <option value="Michoacán">Michoacán</option>
                        <option value="Morelos">Morelos</option>
                        <option value="Nayarit">Nayarit</option>
                        <option value="Nuevo León">Nuevo León</option>
                        <option value="Oaxaca">Oaxaca</option>
                        <option value="Puebla">Puebla</option>
                        <option value="Querétaro">Querétaro</option>
                        <option value="Quintana Roo">Quintana Roo</option>
                        <option value="San Luis Potosí">San Luis Potosí</option>
                        <option value="Sinaloa">Sinaloa</option>
                        <option value="Sonora">Sonora</option>
                        <option value="Tabasco">Tabasco</option>
                        <option value="Tamaulipas">Tamaulipas</option>
                        <option value="Tlaxcala">Tlaxcala</option>
                        <option value="Veracruz">Veracruz</option>
                        <option value="Yucatán">Yucatán</option>
                        <option value="Zacatecas">Zacatecas</option>
                    </select>
                </div>
                <div className="col-6">
                    <label htmlFor="coordinates" className="form-label">Coordenadas</label>
                    <input type="text" className="form-control" id="coordinates" name="coordinates" />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="form-floating">
                        <textarea className="form-control" name="description" placeholder="Leave a comment here" id="description" style={{height: "100px"}}></textarea>
                        <label htmlFor="description">Descripcion</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <label htmlFor="price" className="form-label">Precio</label>
                    <input type="text" className="form-control" id="price" name="price" />
                </div>
                <div className="col-6">
                    <label htmlFor="capacity" className="form-label">Capacidad</label>
                    <input type="text" className="form-control" id="capacity" name="capacity" />
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <label htmlFor="opening_hours" className="form-label">Horas Apertura</label>
                    <input type="text" className="form-control" id="opening_hours" name="opening_hours" />
                </div>
                <div className="col-6">
                    <label htmlFor="closing_hours" className="form-label">Horas Cerrado</label>
                    <input type="text" className="form-control" id="closing_hours" name="closing_hours" />
                </div>
            </div>
            
        </form>
        <div className="alert alert-success hidden" role="alert">
            Locacion creada correctamente.
        </div>
        <div className="alert alert-danger hidden" role="alert">
            Hubo un error al crear locacion.
        </div>
    </div>
  )
}

export default FormVenues