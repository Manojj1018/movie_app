import  React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import FooterComponent from  '../Components/Footer/FooterComponent';
import HeaderComponent from '../Components/Header/HeaderComponent';
import HomeContainer from '../Container/Home/HomeContainer';
import DetailsContainer from '../Container/Details/DetailsContainer';
import SearchContainer from '../Container/Search/SearchContainer';
import Favourite from '../Container/Favourite/Favourite';
import TvSeriesContainer from '../Container/TvSeries/TvSeriesContainer';
import MoviesContainer from '../Container/Movies/MoviesContainer';
const  RouteComponent = ()=>{

    return (
        <>
            <BrowserRouter>
                <HeaderComponent />
                    <Routes>
                        <Route path="/" element={<HomeContainer />} />
                        <Route path="/search" element={<SearchContainer />} />
                        <Route path="/movies" element={<MoviesContainer/>} />
                        <Route path="/series" element={<TvSeriesContainer />} />
                        <Route path="/favourite" element={<Favourite />} />
                        <Route path="/details/:movieid/:mediatype" element={<DetailsContainer />} />
                    </Routes>        
                <FooterComponent />
            </BrowserRouter>
        </>
    )
}

export default RouteComponent;