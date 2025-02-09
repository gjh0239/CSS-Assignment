// Ivan

"use client";

import React from 'react';
import { Navbar } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

import './Navbar.css';

const NavBar = () => {
	return (
		<Navbar expand = "lg" className = "bg-body-tertiary" >
			<Container>
				<Navbar.Brand href="/">Menu</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto" >
						<Nav.Link class="tabs" href="/">Home</Nav.Link>
						<Nav.Link class="tabs" href="/History">History</Nav.Link>
						<Nav.Link class="tabs" href="/Snake" id='tab-snake'>Snake</Nav.Link>
						<Nav.Link class="tabs" href="/TicTacToe">TicTacToe</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar >
	);
}

export default NavBar;