import { useRef } from 'react';
import Header from "../../Layout/Header";
import "./index.scss";

import DataTable from 'datatables.net-react';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';

import DT from 'datatables.net-dt';
import ModalForForm from '../../Components/Admin/ModalForForm';

DataTable.use(DT);

const AdminHome = () => {

    const token = localStorage.getItem('token');

    const columnsReservations = [
        {data: "id"},
        {data: "venue_name"},
        {data: "user_full_name"},
        {data: "user_phone"},
        {data: "user_email"},
        {data: "assistants_number"},
        {data: "event_date"},
        {data: "event_hours"},
        {data: "created_at"},
    ];
    
    const ajaxReservations = {
        url:'http://localhost:3000/api/reservations',
        dataSrc: '',
        type: 'get',
        headers: {
            "Authorization": `Bearer: ${token}`
        },
    }

    const columnsUsers = [
        {data:"id"},
        {data:"name"},
        {data:"lastname"},
        {data:"birthdate"},
        {data:"phone"},
        {data:"email"},
        {data:"user_types_id"},
        {data:"created_at"},
        {data:"updated_at"},
        {data:"deleted_at"},
    ];
    const ajaxUsers = {
        url:'http://localhost:3000/api/users',
        dataSrc: '',
        type: 'get',
        headers: {
            "Authorization": `Bearer: ${token}`
        },
    }

    const columnsVenues = [
        {data:"id"},
        {data:"name"},
        {data:"address"},
        // {data:"postal_code"},
        {data:"city"},
        {data:"state"},
        // {data:"coordinates"},
        // {data:"description"},
        {data:"price"},
        {data:"capacity"},
        {data:"opening_hours"},
        {data:"closing_hours"},
        {data:"created_at"},
        {data:"updated_at"},
    ];

    const ajaxVenues = {
        url:'http://localhost:3000/api/venues',
        dataSrc: '',
        type: 'get',
        headers: {
            "Authorization": `Bearer: ${token}`
        },
    }

    const columnsAmenities = [
        {data:"id"},
        {data:"name"},
        {data:"icon"},
    ];

    const ajaxAmenities = {
        url:'http://localhost:3000/api/amenities',
        dataSrc: '',
        type: 'get',
        headers: {
            "Authorization": `Bearer: ${token}`
        },
    }

    const optionsDT1 = {
        lengthMenu: [25, 50, 75, 100]
    }
    const optionsDT2 = {
        lengthMenu: [25, 50, 75, 100]
    }
    const optionsDT3 = {
        lengthMenu: [25, 50, 75, 100]
    }
    const optionsDT4 = {
        lengthMenu: [25, 50, 75, 100]
    }

    const tableUsers = useRef(null);
    const tableVenues = useRef(null);
    const tableAmenities = useRef(null);

    const buttonUser = {
        10: (data, row) => (
            <button className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#editUserModal" data-bs-element-id={row.id}>Editar</button>
        )
    };
    const buttonVenue = {
        11: (data, row) => (
            <button className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#editVenueModal" data-bs-element-id={row.id}>Editar</button>
        )
    };
    const buttonAmenity = {
        3: (data, row) => (
            <button className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#editAmenityModal" data-bs-element-id={row.id}>Editar</button>
        )
    };

  return (
    <>
        <Header />
        <div className='page-wrapper admin-page'>
            <div className="container">
                <h1>Dashboard</h1>
                <div>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="reservations-tab" data-bs-toggle="tab" data-bs-target="#reservations-pane" type="button" role="tab" aria-controls="reservations-pane" aria-selected="true">Reservaciones</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="users-tab" data-bs-toggle="tab" data-bs-target="#users-tab-pane" type="button" role="tab" aria-controls="users-tab-pane" aria-selected="false">Usuarios</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="venues-tab" data-bs-toggle="tab" data-bs-target="#venues-tab-pane" type="button" role="tab" aria-controls="venues-tab-pane" aria-selected="false">Locaciones</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="amenities-tab" data-bs-toggle="tab" data-bs-target="#amenities-tab-pane" type="button" role="tab" aria-controls="amenities-tab-pane" aria-selected="false">Amenidades</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="reservations-pane" role="tabpanel" aria-labelledby="reservations-tab" tabIndex="0">
                            <DataTable id="reservations_table" ajax={ajaxReservations} columns={columnsReservations} className="display" options={optionsDT1}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Locacion</th>
                                        <th>Usuario</th>
                                        <th>Telefono</th>
                                        <th>Email</th>
                                        <th>Numero de Asistentes</th>
                                        <th>Fecha del evento</th>
                                        <th>Horario del evento</th>
                                        <th>Fecha de registro</th>
                                    </tr>
                                </thead>
                            </DataTable>
                        </div>
                        <div className="tab-pane fade" id="users-tab-pane" role="tabpanel" aria-labelledby="users-tab" tabIndex="0">
                            <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#createUserModal" >Añadir nuevo usuario</button>
                            <DataTable id="users_table" ajax={ajaxUsers} columns={columnsUsers} className="display" options={optionsDT2} ref={tableUsers} slots={buttonUser}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Fecha de Nacimiento</th>
                                        <th>Telefono</th>
                                        <th>Email</th>
                                        <th>Tipo Usuario</th>
                                        <th>Fecha Creacion</th>
                                        <th>Fecha Actualizacion</th>
                                        <th>Fecha Eliminacion</th>
                                        <th></th>
                                    </tr>
                                </thead>
                            </DataTable>
                        </div>
                        <div className="tab-pane fade" id="venues-tab-pane" role="tabpanel" aria-labelledby="venues-tab" tabIndex="0">
                            <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#createVenueModal" >Añadir nueva locacion</button>
                            <DataTable id="venues_table" ajax={ajaxVenues} columns={columnsVenues} className="display" options={optionsDT3} ref={tableVenues} slots={buttonVenue}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Direccion</th>
                                        {/* <th>Codigo Postal</th> */}
                                        <th>Ciudad</th>
                                        <th>State</th>
                                        {/* <th>Coordenadas</th> */}
                                        {/* <th>Descripcion</th> */}
                                        <th>Precio</th>
                                        <th>Capacidad</th>
                                        <th>Horas Apertura</th>
                                        <th>Horas de Cerrado</th>
                                        <th>Fecha Creacion</th>
                                        <th>Fecha Actualizacion</th>
                                        <th></th>
                                    </tr>
                                </thead>
                            </DataTable>
                            
                        </div>
                        <div className="tab-pane fade" id="amenities-tab-pane" role="tabpanel" aria-labelledby="amenities-tab" tabIndex="0">
                            <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#createAmenityModal" >Añadir nueva amenidad</button>
                            <DataTable id="amenities_table" ajax={ajaxAmenities} columns={columnsAmenities} className="display" ref={tableAmenities} options={optionsDT4} slots={buttonAmenity}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Icono</th>
                                        <th></th>
                                    </tr>
                                </thead>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ModalForForm form="userForm" form_title="Agregar usuario" modal_id="createUserModal" form_id="createUsersForm" dt_object={tableUsers} />
        <ModalForForm form="venuesForm" form_title="Agregar locacion" modal_id="createVenueModal" form_id="createVenuesForm" dt_object={tableVenues} />
        <ModalForForm form="amenitiesForm" form_title="Agregar amenidad" modal_id="createAmenityModal" form_id="createAmenitiesForm" dt_object={tableAmenities} />

        <ModalForForm form="editAmenitiesForm" form_title="Editar amenidad" modal_id="editAmenityModal" form_id="editAmenitiesForm" dt_object={tableAmenities} />
        <ModalForForm form="editUserForm" form_title="Editar usuario" modal_id="editUserModal" form_id="editUserForm" dt_object={tableUsers} />
        <ModalForForm form="editVenuesForm" form_title="Editar locacion" modal_id="editVenueModal" form_id="editVenuesForm" dt_object={tableVenues} />
    </>
  )
}

export default AdminHome