import React from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext'


//styles
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

//pages, components,
import Dashboard from './routes/Dashboard';
import Login from './routes/Login';
import Signup from './routes/Signup';
import CreateProject from './routes/CreateProject';
import Project from './routes/Project';

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsConditions from "./components/TermsConditions";
import ActiveUsers from "./components/ActiveUsers";

function App() {
    const {authIsReady, user} = useAuthContext()

    return (
        <div className="d-flex overflow-auto">
            {authIsReady && (
                <HashRouter>
                    {user && <Sidebar/>}
                    {user && <ActiveUsers/>}
                    <Container fluid className="flex-grow-1 py-0 px-0">
                        <Header/>
                        <Routes>
                            <Route path="/" element={
                                user ? <Navigate to="/dashboard"/> : <Navigate to="/login"/>
                            }/>
                            <Route path="/dashboard" element={
                                user ? <Dashboard/> : <Navigate to="/login"/>
                            }/>
                            <Route path="/createProject" element={
                                user ? <CreateProject/> : <Navigate to="/login"/>
                            }/>
                            <Route path="/projects/:id" element={
                                user ? <Project/> : <Navigate to="/login"/>
                            }/>
                            <Route path="/login" element={
                                user ? <Navigate to="/"/> : <Login/>
                            }/>
                            <Route path="/signup" element={
                                user? <Navigate to="/"/> : <Signup/>
                            }/>
                            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                            <Route path="/terms-conditions" element={<TermsConditions />} />
                        </Routes>
                    </Container>
                    <Footer/>
                </HashRouter>

            )}
        </div>
    );
}

export default App;
