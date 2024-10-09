import { useState, useEffect } from "react";
import "./index.scss"
import { Link, redirect } from "react-router-dom";
import Header from "../../Layout/Header";
import ItemList from '../../Components/ItemList';
import { useAuthContext } from '../../Hook/useAuthContext'

const Home = () => {
	return (
		<>
			<Header/>
			<div className='page-wrapper home-page'>
				<div className="container">
					<h1>Home</h1>
					<div>
						<ItemList/>
					</div>
				</div>
			</div>
		</>
	)
}

export default Home