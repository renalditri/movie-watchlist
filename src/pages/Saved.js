import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { Row } from 'react-bootstrap';
import FetchData from '../data/FetchData';
import useAuth from '../AuthProvider';

export default function Saved(props) {
  const [saved, setSaved] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    FetchData.getSaved(user)
      .then(res => {
        console.log('Fetching saved movies', res);
        setSaved(res);
      })
  }, [])

  return (
    <div>
      <h1>Your Watchlist</h1>
      <Row>
        <MovieCardsContainer data={saved} size={6} />
      </Row>
    </div>
  )
}

function MovieCardsContainer(props) {
  const { data, size } = props;
  if (data.movies) {
    const movies = data.movies;
    return movies.map((movie, index) => {
      return (
        <MovieCard 
        key={index} 
        keyprop={index} 
        id={movie.id} 
        title={movie.title} 
        size={size} 
        src={movie.poster} 
        saved={{watched: movie.watched}}
        />
      )
    })
  }

  return;
}