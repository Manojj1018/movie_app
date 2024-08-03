import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
    const navData = [
        { name: 'Home', link: '/' },
        { name: 'Search', link: '/search' },
        { name: 'Favourite', link: '/favourite' },
    ];

    const categories = ['movie', 'tv'];
    const genres = ['Action', 'Comedy', 'Drama', 'Fantasy'];
    const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

    return (
        <header className='header'>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand>CineFlix</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                            {navData.map((item) => (
                                <Nav.Link key={item.name} as={Link} to={item.link}>{item.name}</Nav.Link>
                            ))}
                            <NavDropdown title="Category" id="category-dropdown">
                                {categories.map((category) => (
                                    <NavDropdown.Item key={category} style={{ background: '#2b2b31' }}>
                                        {category === 'movie' ? 'Movie' : 'TV Show'}
                                    </NavDropdown.Item>
                                ))}
                            </NavDropdown>
                            <NavDropdown title="Genre" id="genre-dropdown">
                                {genres.map((genre) => (
                                    <NavDropdown.Item key={genre} style={{ background: '#2b2b31' }}>
                                        {genre}
                                    </NavDropdown.Item>
                                ))}
                            </NavDropdown>
                            <NavDropdown title="Year" id="year-dropdown">
                                {years.map((year) => (
                                    <NavDropdown.Item key={year} style={{ background: '#2b2b31' }}>
                                        {year}
                                    </NavDropdown.Item>
                                ))}
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default HeaderComponent;
