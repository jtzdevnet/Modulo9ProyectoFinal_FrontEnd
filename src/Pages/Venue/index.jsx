import { useState, useRef, useEffect } from "react";
import "./index.scss"
import { useParams, useNavigate, Link, redirect } from "react-router-dom";
import Header from "../../Layout/Header";
import { getVenueByIdService } from "../../Services/venueServices";
import Carousel from 'react-bootstrap/Carousel';
import ReservationModal from '../../Components/ReservationModal';
import Button from 'react-bootstrap/Button';
import { useAuthContext } from '../../Hook/useAuthContext'


const Venue = () => {

    let { venueId } = useParams();
    let navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [VenueData, setVenueData] = useState([])
    const { userPayload } = useAuthContext()
    console.log(userPayload);
    

    useEffect(() => {

        

        const fetchItemsData = async () => {
            try {
                const response = await getVenueByIdService(token,venueId);
                if (response.status === 200) {
                    setVenueData(response.data);
                    console.log(response.data[1]);
                }
            } catch (error) {
                console.log('Ocurrio un error en Venues',error);
            }
        }
        fetchItemsData();
    }, [])

    return (
        <>
            <Header/>
            <div className='page-wrapper venue-page'>
                <div className="container">
                    <div>
                        {VenueData && VenueData.length > 0 ?
                            <>
                                <button className='btn btn-light back-button' onClick={() => navigate(-1)}><i class="bi bi-arrow-left"></i> Regresar</button>
                                <h1>{VenueData[0].name}</h1>
                                <div className="item-information-container">
                                    <div className="item-images">
                                        <Carousel>
                                            <Carousel.Item>
                                                <img src={VenueData[0].has_images ? '/venue_images/'+VenueData[0].id+'/1.jpg' : '/venue_images/placeholder.jpg' } alt="..."/>
                                            </Carousel.Item>
                                            
                                        </Carousel>
                                    </div>
                                    <div className="item-information">
                                        <h3>Descripcion</h3>
                                        <span className="item-category">{VenueData[0].category}</span>
                                        <p className="item-description">{VenueData[0].description}</p>
                                        <p><b>Capacidad:</b> {VenueData[0].capacity} personas.</p>
                                        <p className="item-price"><b>Precio:</b> ${VenueData[0].price}</p>
                                        <p><b>Ubicacion:</b> {VenueData[0].address}, {VenueData[0].city}, {VenueData[0].state}</p>
                                        <p><b>Horario:</b> {VenueData[0].opening_hours} - {VenueData[0].closing_hours}</p>
                                        <Button variant="primary" data-bs-toggle="modal" data-bs-target="#reservationModal">Reservar ahora</Button>
                                    </div>
                                </div>
                                <div className="item-information-ammenities">
                                    <h3>Amenidades</h3>
                                    <ul>
                                        {VenueData[1].map(amenity => 
                                            <li key={amenity.id}>
                                                <div>
                                                    <img src={"/images/icons/"+amenity.icon} />
                                                    <span>{amenity.name}</span>
                                                </div>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </>
                            : 
                            <>
                                <h1>Oops! Ese producto no existe.</h1>
                                <Link to="/">Volver</Link>
                            </>
                        }
                    </div>
                </div>
            </div>

            <ReservationModal id="reservationModal" venueId={venueId} userId={userPayload.id}  />
            
        </>
    )
}

export default Venue