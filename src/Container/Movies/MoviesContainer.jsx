import React, { useState, useEffect, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import CardMoviesComponents from '../../Components/CardMovies/CardMoviesComponents';
import LeftListBarComponent from '../../Components/LeftListBar/LeftListBarComponent';
import useGenres from '../../Hooks/useGenres';

const MoviesContainer = () => {
    const [content, setContent] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [pageno, setPageno] = useState(1);

    const API_KEY = process.env.REACT_APP_NOT_SECRET_CODE;
    const genreforURL = useGenres(selectedGenres);

    const GetDataTrending = useCallback(async () => {
        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${pageno}&language=en-US&with_genres=${genreforURL}`);
            setContent(data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [API_KEY, pageno, genreforURL]);

    useEffect(() => {
        GetDataTrending();
    }, [GetDataTrending]);

    return (
        <main className='homePage'>
            <Container>
                <Row>
                    <Col className='col-12'>
                        <section>
                            <h1 className='txtCenter'>Top Trending Movies</h1>
                            <h3 className='txtCenter'>For You</h3>
                        </section>
                    </Col>
                </Row>
                <Row>
                    <Col className='col-2'>
                        <LeftListBarComponent 
                            genres={genres} 
                            selectedGenres={selectedGenres} 
                            setSelectedGenres={setSelectedGenres}  
                            setGenres={setGenres} 
                            type="movie" 
                            setPage={setPageno} 
                        /> 
                    </Col>
                    <Col className='col-10'>
                        <Row>
                            {content && content.length > 0 ? (
                                content.map((item, index) => (
                                    <CardMoviesComponents key={index} data={item} mediaType="movie" />
                                ))
                            ) : (
                                'Loading ....'
                            )}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default MoviesContainer;
