import React, { useState } from 'react';
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { Row, Col } from 'react-bootstrap';
import FetchData from '../data/FetchData';

export default function Home(props) {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const searchMovie = () => {
    if(search == '') {
      alert('Please type in your movie/show title');
      return;
    }
    FetchData.searchTitle(search)
    .then(res => {
      setMovies(res);
    });
  }
  return (
    <div>
      <h1>Movie Watchlist</h1>
      <Row>
        <Col>
          <input
            onChange={(e) => setSearch(e.target.value)}
            type={'text'}
            placeholder="Search Movie Title"
            value={search}
          />
          <button onClick={searchMovie}>Search</button>
        </Col>
      </Row>
      <Row>
        <MovieCardsContainer movies={movies} size={6} />
      </Row>
    </div>
  )
}

function MovieCardsContainer(props) {
  const { movies, size } = props
  return movies.map((movie, index) => {
    return(
      <MovieCard key={index} keyprop={index} id={movie.imdbID} title={`${movie.Title} (${movie.Year})`} size={size} src={movie.Poster} />
    )
  })
}