import React from 'react'
import "./index.scss"
import { Link } from "react-router-dom";

const ItemCard = ({venue}) => {
  return (
    <div className="item-card" key={venue.id}>
        <div className="item-img-wrap">
            <Link to={`/venue/${venue.id}`} className='item-card-link'>
              <img src={venue.has_images ? "/venue_images/"+venue.id+"/1.jpg" : "/venue_images/placeholder.jpg"} className="card-img-top" alt={venue.name} />
            </Link>
        </div>
        <div className="item-card-body">
            <h5 className="card-title">{venue.name}</h5>
            <p className="card-category">{venue.description}</p>
            <span className="card-price">${venue.price}</span>
            <Link to={`/venue/${venue.id}`} className='btn btn-primary item-card-link'>
              <span className="card-button">Ver Lugar</span>
            </Link>
        </div>
    </div>
  )
}

export default ItemCard