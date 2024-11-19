import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/home">
				<span className="navbar-brand mb-0 h1">List Contact</span>
			</Link>
			<div className="ml-auto">
				<Link to="/add-contact">
					<button className="btn btn-info">Add Contact</button>
				</Link>
			</div>
		</nav>
	);
};
