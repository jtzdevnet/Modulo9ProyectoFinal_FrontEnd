import React from 'react'
import { useState, useEffect } from "react";
import { getAllVenuesService } from "../../Services/venueServices";
import ItemCard from "../ItemCard";
import { useParams } from "react-router-dom";
import "./index.scss";

const ItemList = () => {

    const [itemList, setItemList] = useState([]);
    const token = localStorage.getItem('token');
    let { query,category } = useParams();

    useEffect(() => {
        const fetchVenuesData = async () => {
            try {
            const response = await getAllVenuesService(token);
            if (response.status === 200) {
                console.log(response.data);
                if (query){
                    setItemList(response.data.filter(venue => venue.name.toLowerCase().includes(query.toLowerCase())));
                    console.log(itemList);
                }
                else if (category){
                    setItemList(response.data.filter(venue => venue.category.toLowerCase().includes(category.toLowerCase())));
                    console.log(itemList);
                }
                else{
                    setItemList(response.data);
                }

            }
            } catch (error) {
                console.log('Ocurrio un error en ItemList',error);
            }
        }
        fetchVenuesData();
        
    }, [])

  return (
    <div className="items-list">
        {query ? <h3>Resultados para: {query}</h3> : category ? <h3>Resultados para: {category}</h3> : ''}
        {itemList && itemList.map(venue =>
            <ItemCard venue={venue} key={venue.id} />
        )}
    </div>
  )
}

export default ItemList