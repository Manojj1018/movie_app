import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
    const navData = [
        { name: 'Home', link: '/' },
        { name: 'Search', link: '/search' },
        { name: 'Favourite', link: '/favourite' },
        { name: 'Movies', link: '/movies' },
        { name: 'Tv Series', link: '/series' },
    ];

    return (
        <header className='header'>
            <Navbar bg="dark" expand="lg" variant="dark" className="sticky-top">
                <Container>
                    <Navbar.Brand as={Link} to="/">CineFlix</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                            {navData.map((item) => (
                                <Nav.Link key={item.name} as={Link} to={item.link}>{item.name}</Nav.Link>
                            ))}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default HeaderComponent;
