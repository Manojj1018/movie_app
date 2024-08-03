import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { img_300, img_not_available } from '../../Config';
import './CardMoviesComponents.css';

const CardMoviesComponents = ({ data, mediaType }) => {
    const [liked, setLiked] = useState(false);

    const title = data.original_title || data.name;
    const id = data.id;
    const ImageURL = data.poster_path ? img_300 + data.poster_path : img_not_available;
    const media_type = data.media_type ? data.media_type : data.type ? data.type : mediaType;
    const release_date = data.release_date || data.first_air_date;
    const vote_average = parseInt(data.vote_average);
    const original_language = data.original_language || '';

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isLiked = favorites.some(item => item.id === id);
        setLiked(isLiked);
    }, [id]);

    const handleLike = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (liked) {
            // Remove from favorites
            const updatedFavorites = favorites.filter(item => item.id !== id);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        } else {
            // Add to favorites
            favorites.push({ id, title, ImageURL, media_type, release_date, vote_average, original_language });
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
        setLiked(!liked);
    };

    return (
        <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6'>
            <Link to={`/details/${id}/${media_type}`} className='video-thumb'>
                <figure className="video-image">
                    <span>
                        <img src={ImageURL} alt={title} />
                        <i 
                            className={`fa fa-star star-icon ${liked ? 'liked' : ''}`} 
                            onClick={handleLike} 
                        />
                    </span>
                    <div className="circle-rate">
                        <svg className="circle-chart" viewBox="0 0 30 30" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                            <circle className="circle-chart__background" stroke="#2f3439" strokeWidth="2" fill="none" cx="15" cy="15" r="14"></circle>
                            <circle className="circle-chart__circle" stroke="#4eb04b" strokeWidth="2" strokeDasharray={`${vote_average}0,100`} cx="15" cy="15" r="14"></circle>
                        </svg>
                        <b>{vote_average}</b>
                    </div>
                    <div className="hd">{media_type}
                        <b>{original_language}</b>
                    </div>
                </figure>
                <div className="video-content">
                    <ul className="tags">
                        <li>Release Date</li>
                    </ul>
                    <small className="range">{release_date}</small>
                    <h3 className="name">
                        {title}
                    </h3>
                </div>
            </Link>
        </div>
    );
}

export default CardMoviesComponents;
