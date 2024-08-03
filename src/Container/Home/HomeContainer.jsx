import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import CardMoviesComponents from '../../Components/CardMovies/CardMoviesComponents';

const HomeContainer = () => {
    const [content, setContent] = useState([]);
    const [pageno, setPageno] = useState(1);
    const [loading, setLoading] = useState(false);
    const observer = useRef();
    const API_KEY = process.env.REACT_APP_NOT_SECRET_CODE;

    const GetDataTrending = async () => {
        setLoading(true);
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${pageno}`);
        setContent(prevContent => [...prevContent, ...data.results]);
        setLoading(false);
    };

    useEffect(() => {
        GetDataTrending();
        // eslint-disable-next-line
    }, [pageno]);

    useEffect(() => {
        if (loading) return;
        const currentObserver = observer.current;
        if (currentObserver) currentObserver.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPageno(prevPage => prevPage + 1);
            }
        });
        if (observer.current) observer.current.observe(document.querySelector('#load-more'));
    }, [loading]);

    return (
        <main className='homePage'>
            <Container>
                <Row>
                    <Col className='col-12'>
                        <section>
                            <h1 className='txtCenter'>Top Trending</h1>
                            <h3 className='txtCenter'>TV and Movies For You</h3>
                        </section>
                    </Col>
                    {content && content.length > 0 ? content.map((item, index) => (
                        <CardMoviesComponents key={index} data={item} />
                    )) : 'Loading ....'}
                    <div id="load-more" style={{ height: '20px', marginTop: '20px' }}>
                        {loading && 'Loading more...'}
                    </div>
                </Row>
            </Container>
        </main>
    );
};

export default HomeContainer;
