import React, { useState } from "react";
import { useCollection } from "../hooks/useCollection";
import Avatar from "./Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default function ActiveUsers() {
    const { isPending, error, documents } = useCollection("users");
    const [showUsers, setShowUsers] = useState(false);

    const toggleUsers = () => {
        setShowUsers(!showUsers);
    };

    return (
        <>
            <Navbar bg="light" expand="lg" className="d-none d-lg-block px-3" style={{backgroundColor: "#3e3c44"}}>
                <Nav className="d-flex flex-column">
                    {isPending && <Nav.Item>Loading users...</Nav.Item>}
                    {error && <Nav.Item>{error}</Nav.Item>}
                    {documents &&
                        documents.map((user) => (
                            <Nav.Item key={user.id} className="bg-light shadow-lg p-2 mt-2 rounded d-flex justify-content-center align-items-center flex-column">
                                <Avatar src={user.photoURL} style={{ width: "30px", height: "30px" }} />
                                <div>
                                <span className="p-1">{user.displayName}</span>
                                {user.online && (
                                    <span
                                        className="d-flex"
                                        style={{ width: "100%", height: "4px", backgroundColor: "#25ae5f" }}
                                    ></span>
                                )}
                                </div>
                            </Nav.Item>
                        ))}
                </Nav>
            </Navbar>

            <div className="d-block d-lg-none bg-light px-2 mt-2">
                <button type="button" className="btn btn-primary border-0 d-block p-2" onClick={toggleUsers}  style={{ background: '#3e3c44', width: '38px', height: '34px'}}>
                    <FontAwesomeIcon icon={faUsers} className="p-o list-unstyled" />
                </button>
                {showUsers && (
                    <div className="mt-4">
                        {isPending && <div>Loading users...</div>}
                        {error && <div>{error}</div>}
                        {documents &&
                            documents.map((user) => (
                                <ul key={user.id} className="shadow-lg p-1 rounded">
                                    <li className="d-flex justify-content-center align-items-center flex-column">
                                        <Avatar src={user.photoURL} style={{ width: "20px", height: "20px" }} />
                                        <div>
                                            <span className="p-1">{user.displayName}</span>
                                            {user.online && (
                                                <span
                                                    className="d-flex"
                                                    style={{ width: "100%", height: "4px", backgroundColor: "#25ae5f" }}
                                                ></span>
                                            )}
                                        </div>
                                    </li>
                                </ul>
                            ))}
                    </div>
                )}
            </div>
        </>
    );
}


