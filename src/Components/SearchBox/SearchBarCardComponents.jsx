import React from 'react';
import './style.css';

const SearchBarCardComponents = ({ searchValue, setSearchValue, handleSearch }) => {
    
    const changeSearchHandle = (e) => {
        setSearchValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch();
    }

    return (
        <>
            <div className='searchBox'>
                <div className="container d-flex align-items-center justify-content-center w-auto">
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="search" 
                            value={searchValue} 
                            onChange={changeSearchHandle} 
                            placeholder="Search movies here" 
                        />
                        <input type="submit" value="FIND" />
                    </form>
                </div>
            </div>
        </>
    )
}

export default SearchBarCardComponents;