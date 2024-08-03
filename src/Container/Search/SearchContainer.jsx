import React, { useState, useEffect, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import CardMoviesComponents from '../../Components/CardMovies/CardMoviesComponents';
import SearchBarCardComponents from '../../Components/SearchBox/SearchBarCardComponents';

const SearchContainer = () => {
    const [content, setContent] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const API_KEY = process.env.REACT_APP_NOT_SECRET_CODE;

    const GetDataTrending = useCallback(async () => {
        if (searchValue) {
            const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchValue}&include_adult=false`);
            console.log('data', data.results);
            setContent(data.results);
        } else {
            setContent([]);
        }
    }, [searchValue, API_KEY]);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            GetDataTrending();
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchValue, GetDataTrending]);

    const handleSearch = () => {
        GetDataTrending();
    }

    return (
        <main className='homePage'>
            <Container>
                <Row>
                    <Col className='col-12'>
                        <section>
                            <h1 className='txtCenter'>Search Movies</h1>
                            <SearchBarCardComponents
                                searchValue={searchValue}
                                setSearchValue={setSearchValue}
                                handleSearch={handleSearch}
                            />
                        </section>
                    </Col>
                </Row>
                <Row>
                    <Col className='col-12'>
                        <Row>
                            {content && content.length > 0 ? content.map((item, index) => {
                                return (<CardMoviesComponents key={index} data={item} mediaType="movie"/>)
                            }) : 'No results found'}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </main>
    )
}

export default SearchContainer;
