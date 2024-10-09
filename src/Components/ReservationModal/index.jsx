import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Spanish } from "flatpickr/dist/l10n/es.js"
import './index.scss'

const ReservationModal = (props) => {
    const token = localStorage.getItem('token');
    const fp1 = flatpickr("#myCalendar", {
        locale: Spanish,
        inline: true,
        minDate: new Date().fp_incr(1),
        dateFormat: "Y-m-d H:i",
    }); // flatpickr

    const fp2 = flatpickr("#myStartHours", {
        locale: Spanish,
        inline: true,
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        defaultDate: "08:00",
        minTime: "08:00",
        maxTime: "02:00",
        time_24hr: false
    }); // flatpickr

    const fp3 = flatpickr("#myEndHours", {
        locale: Spanish,
        inline: true,
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        minTime: "08:00",
        maxTime: "02:00",
        defaultDate: "22:00",
        time_24hr: false
    }); // flatpickr



    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const eventHours = formData.get("event_hours1") + " - " + formData.get("event_hours2");
        formData.append("user_id", props.userId);
        formData.append("venue_id", props.venueId);
        formData.append("event_hours", eventHours);
        formData.delete("event_hours1");
        formData.delete("event_hours2");
        // console.log(formData.get("user_id"));
        // console.log(formData.get("venue_id"));
        // console.log(formData.get("event_date"));
        // console.log();
        // console.log();
        // console.log(formData.get("assistants_number"));
        var formObject = {};
        formData.forEach(function(value, key){
            formObject[key] = value;
        });
        var formJson = JSON.stringify(formObject);
        console.log(formJson);
        try {
            const response = await fetch('http://localhost:3000/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: formJson
            });

            if (!response.ok) {
                throw new Error('Failed to submit reservation');
            }
            const data = await response.json();
            console.log('Reservation successful', data);
            e.target.classList.add('hidden');

        } catch (err) {
            console.error(err);
        }
        
    };

    // {
    //     disable: ["2025-01-30", "2025-02-21", "2025-03-08", new Date(2025, 4, 9) ],
    //     dateFormat: "Y-m-d",
    // }

    return (
    <>
        <div className="modal fade" id={props.id} tabIndex="-1" aria-labelledby={props.id+"Label"} aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-2" id={props.id+"Label"}>Reservar ahora</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form id="reservationForm" onSubmit={handleSubmit}>
                        <div className="row justify-content-start">
                            <div className="col-6 col-xs-12">
                                <h4>¿Que fecha deseas reservar?</h4>
                                <div>
                                    <input id="myCalendar" name="event_date"  className="flatpickr hidden flatpickr-input active" type="text" placeholder="Select Date.." readOnly="readonly"></input>
                                </div>
                            </div>
                            <div className="col-6 col-xs-12">
                                <h4>¿De que hora a que hora es tu evento?</h4>
                                <div className="hours-wrapper">
                                    <div>
                                        <label htmlFor="myStartHours">Inicia:</label>
                                        <input id="myStartHours"  name="event_hours1" className="flatpickr hidden flatpickr-input active" type="text" placeholder="Select Date.." readOnly="readonly"></input>
                                    </div>
                                    <div>
                                        <label htmlFor="myEndHours">Termina:</label>
                                        <input id="myEndHours"  name="event_hours2" className="flatpickr hidden flatpickr-input active" type="text" placeholder="Select Date.." readOnly="readonly"></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <h4>Numero estimado de asistentes:</h4>
                                <div>
                                    <input type="number" defaultValue="1" name="assistants_number" min="1" />
                                </div>
                            </div>
                        </div>
                    </form>
                    
                </div>
                <div className="modal-footer justify-content-center">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="submit" form="reservationForm" className="btn btn-primary">Reservar ahora</button>
                </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default ReservationModal

