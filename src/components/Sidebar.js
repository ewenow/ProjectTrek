import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useAuthContext } from '../hooks/useAuthContext'

export default function Sidebar() {
    const { user } = useAuthContext();
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleMenu = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Navbar expand="lg" className="d-flex justify-content-center align-items-start shadow-sm" style={{backgroundColor: "#3e3c44"}}>
            <Container >
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="p-0 mt-1" onClick={toggleMenu} />
                <Navbar.Collapse id="basic-navbar-nav" className={isExpanded ? "show" : ""}>

                    <Nav className="links mt-2 ml-3" style={{flexGrow: 1}}>
                        <div className="text-center mb-3">
                            <ul className="nav flex-column">
                                <li className="nav-item">

                                    <img src={user.photoURL} alt="user avatar" className="rounded-circle" style={{width: "130px", height: "130px", padding: "10px",}} /> </li>
                                <li className="nav-item">
                                    <h5 className="text-white mt-2 mb-5">Hey {user.displayName}!</h5>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/" className="nav-link text-light" style={{padding: "10px"}}>
                                        <span>Dashboard</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/CreateProject" className="nav-link text-light" style={{padding: "10px"}}>
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
