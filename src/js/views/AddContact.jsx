import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.css";

const initialContact = {
	name: "",
	phone: "",
	email: "",
	address: ""
}

export const AddContact = () => {
	const { store, actions } = useContext(Context)
	const [contact, setContact] = useState(initialContact)
	const [save,setSave] = useState(false)

	 const handleChange = (evt) => {
	 	setContact({
	 		...contact,
			[evt.target.name]:evt.target.value
	 	})
	} 

	const newContact = async (contact) => {
		const result = await actions.saveContact(contact)
		if(result){
			setSave(true)
			setTimeout(()=>{
				setSave(false)
			},2000)
		}
	}

	return (
		<div className="container pt-4">
			<h1 className="fs-1 text-center">Add New Contact</h1>
			<form className="form p-2 my-3 border border-1">
				<div className="mb-3">
					<label for="inputName" className="form-label">Name</label>
					<input
						type="text"
						className="form-control"
						name="name"
						value={contact.name}
						id="inputName" 
						onChange={handleChange}
					/>
				</div>
				<div className="mb-3">
					<label for="inputEmail" className="form-label">E-mail</label>
					<input 
						type="email" 
						className="form-control" 
						name="email" 
						value={contact.email} 
						id="inputEmail" 
						onChange={handleChange}
					/>
				</div>
				<div className="mb-3">
					<label for="inputPhone" className="form-label">Phone</label>
					<input 
						type="text" 
						className="form-control" 
						name="phone" 
						value={contact.phone} 
						id="inputPassword"
						onChange={handleChange} 
						/>
				</div>
				<div className="mb-3">
					<label for="inputAddress" className="form-label">Address</label>
					<input 
						type="text" 
						className="form-control" 
						name="address" 
						value={contact.address} 
						id="inputAddress" 
						onChange={handleChange}
					/>
				</div>

				<button type="button" onClick={()=>newContact(contact)} className="btn btn-info w-100">Create</button>
				{save && <div class="alert alert-success mt-3" role="alert">
							Contact successfully added
						</div>}
			</form>
			<Link to="/">
				<button className="btn btn-dark">Back to Contact</button>
			</Link>
		</div>
	);
};