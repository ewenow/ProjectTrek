import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { projectAuth, projectFirestore } from '../firebase/firebase';
import { useAuthContext } from '../hooks/useAuthContext';

import logo from '../assets/logo.png';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = React.memo(() => {
    const [loggingOut, setLoggingOut] = useState(false);
    const { user, dispatch } = useAuthContext();

    const handleLogout = async () => {
        try {
            setLoggingOut(true);

            // update online status
            const documentRef = projectFirestore.collection('users').doc(user.uid);
            await documentRef.update({ online: false });

            // logout
            await projectAuth.signOut();

            // dispatch logout action
            dispatch({ type: 'LOGOUT' });
        } catch (error) {
            console.error(error);
        } finally {
            setLoggingOut(false);
        }
    };

    return (
        <Navbar expand="lg" className="d-shadow-sm" style={{backgroundColor: "#ebd3ff", height: "60px"}}>
            <Container>
                <Navbar.Brand>
                    <Link to="/" className="text-decoration-none">
                        <img
                            src={logo}
                            height="30"
                            className="d-inline-block align-top"
                            alt="ProjectTrek logo"
                        />
                        <span className="ms-2 text-dark">ProjectTrek</span>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto p-0"/>
                <Navbar.Collapse id="basic-navbar-nav" className="text-end  my-3">
                    <Nav className="ms-auto" >
                        {user ? (
                            <button className="btn btn-transparent border-0 text-end p-0 mt-1 mr-0" onClick={handleLogout} disabled={loggingOut}>
                                {loggingOut ? 'Logging out...' : 'Logout'}
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className="nav-link">Login</Link>
                                <Link to="/signup" className="nav-link">Signup</Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default Header;



//problem z aktualizacją odpowiedzi z serwera, rozwiązanie - przeniesienie hooka loggout do Header

/*import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

import logo from '../assets/logo.png';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default function Header() {

    const { logout, isPending } = useLogout()
    const { user } = useAuthContext()

    return (
        <Navbar expand="lg" className="shadow-sm" style={{backgroundColor: "#ebd3ff", height: "60px"}}>
            <Container>
                <Navbar.Brand>
                    <Link to="/">
                    <img
                        src={logo}
                        height="30"
                        className="d-inline-block align-top"
                        alt="ProjectTrek logo"
                    />
                    </Link>
                    {' ProjectTrek'}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto p-0"/>
                <Navbar.Collapse id="basic-navbar-nav" className="text-end  my-3">
                    <Nav className="ms-auto" >
                        {user ? (

                            <button className="btn btn-transparent border-0 text-end p-0 mt-1 mr-0" onClick={logout} disabled={isPending}>
                                {isPending ? 'Logging out...' : 'Logout'}
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className="nav-link">Login</Link>
                                <Link to="/signup" className="nav-link">Signup</Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}*/

