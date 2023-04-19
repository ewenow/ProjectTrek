import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-1 fixed-bottom" style={{backgroundColor: "#ECECEC", }}>
            <Container>
                <Row className="d-flex">
                    <Col lg={6} className="text-center text-lg-start mt-2">
                        <p>Copyright ⓒ {currentYear}</p>
                    </Col>
                    <Col lg={6} className="text-center text-lg-end mt-2">
                        <p>
                            <a href="#" className="text-decoration-none mx-3">Privacy Policy</a>
                            <a href="#" className="text-decoration-none">Terms &amp; Conditions</a>
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;


