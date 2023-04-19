import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useAuthContext } from '../hooks/useAuthContext'

export default function Sidebar() {
    const { user } = useAuthContext()

    return (
        <Navbar expand="lg" className="d-flex justify-content-center align-items-start shadow-sm" style={{backgroundColor: "#3e3c44", height: "100vh"}}>
            <Container >
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="p-0 mt-1"/>
                <Navbar.Collapse id="basic-navbar-nav" >

                    <Nav className="links mt-2 ml-3" style={{flexGrow: 1}}>
                    <div className="text-center mb-3">
                        <ul className="nav flex-column">
                            <li className="nav-item">

                                <img src={user.photoURL} alt="user avatar" className="rounded-circle" style={{width: "150px", height: "150px", padding: "20px",}} /> </li>
                            <li className="nav-item">
                                <h5 className="text-white mt-2 mb-5">Hey {user.displayName}</h5>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link d-flex align-items-center text-light" style={{padding: "10px"}}>
                                    <span>Dashboard</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/CreateProject" className="nav-link d-flex align-items-center text-light" style={{padding: "10px"}}>
                                    <span>Create Project</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

