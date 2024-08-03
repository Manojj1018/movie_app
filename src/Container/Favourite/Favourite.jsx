import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Favourite = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    const handleUnstar = (id) => {
        const updatedFavorites = favorites.filter(item => item.id !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <main className='favouritePage'>
            <h1>Favorites</h1>
            <div className='row'>
                {favorites.length > 0 ? favorites.map((item) => (
                    <div key={item.id} className='col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6'>
                        <div className='video-thumb'>
                            <Link to={`/details/${item.id}/${item.media_type}`}>
                                <figure className="video-image">
                                    <span>
                                        <img src={item.ImageURL} alt={item.title} />
                                        <i 
                                            className="fa fa-star star-icon liked"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleUnstar(item.id);
                                            }}
                                        />
                                    </span>
                                    <div className="circle-rate">
                                        <svg className="circle-chart" viewBox="0 0 30 30" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                                            <circle className="circle-chart__background" stroke="#2f3439" strokeWidth="2" fill="none" cx="15" cy="15" r="14"></circle>
                                            <circle className="circle-chart__circle" stroke="#4eb04b" strokeWidth="2" strokeDasharray={`${item.vote_average}0,100`} cx="15" cy="15" r="14"></circle>
                                        </svg>
                                        <b>{item.vote_average}</b>
                                    </div>
                                    <div className="hd">{item.media_type}
                                        <b>{item.original_language}</b>
                                    </div>
                                </figure>
                                <div className="video-content">
                                    <ul className="tags">
                                        <li>Release Date</li>
                                    </ul>
                                    <small className="range">{item.release_date}</small>
                                    <h3 className="name">
                                        {item.title}
                                    </h3>
                                </div>
                            </Link>
                        </div>
                    </div>
                )) : <p>No favorites added.</p>}
            </div>
        </main>
    );
}

export default Favourite;