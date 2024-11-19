import React, { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar.jsx";

const editedContact = {
    name: "",
    phone: "",
    email: "",
    address: ""
}

const EditContact = () => {
    const { store, actions } = useContext(Context)
    const { theid } = useParams()
    const [contact, setContact] = useState(editedContact)
    const [edited, setEdited] = useState(false)

    const handleChange = (evt) => {
        setContact({
            ...contact,
            [evt.target.name]: evt.target.value
        })
    }

    const edit = async (theid, contact) => {
        const editado = await actions.updateContact(theid, contact)
        if (editado) {
            setEdited(true)
            setTimeout(() => { setEdited(false) }, 1000)
        }
    }

    return (
        <>
            <Navbar />

            <div className="container pt-4">
                <h1 className="fs-1 text-center">Edit Contact</h1>
                <form className="form p-2 my-3 border border-1">
                    <div className="mb-3">
                        <label htmlFor="inputName"
                            placeholder="Your name"
                            className="form-label">Name
                        </label>
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
                        <label htmlFor="inputEmail" className="form-label">E-mail</label>
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
                        <label htmlFor="inputPhone" className="form-label">Phone</label>
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
                        <label htmlFor="inputAddress"
                            className="form-label">Address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="address"
                            value={contact.address}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="button"
                        onClick={() => edit(theid, contact)}
                        className="btn btn-info w-100">Change
                    </button>
                    {edited && <div className="alert alert-success mt-3" role="alert">
                        Contact edited successfully
                    </div>}
                </form>
                <Link to="/">
                    <button className="btn btn-dark">
                        Back
                    </button>
                </Link>
            </div>
        </>
    )

}

export default EditContact

