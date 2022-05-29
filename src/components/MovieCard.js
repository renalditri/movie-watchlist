import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Card, Row, Col } from 'react-bootstrap';
import useAuth from '../AuthProvider';
import FetchData from '../data/FetchData';

export default function MovieCard(props) {
  const [refresh, setRefresh] = useState(false);
  const {
    id,
    keyprop,
    title = 'placeholder',
    src = 'https://cinemags.co.id/wp-content/uploads/2021/11/The-Batman-Poster.jpg',
    size,
    saved = false
  } = props;
  const { user } = useAuth();
  const clickHandler = () => {
    if(!user) {
      alert('Mohon login terlebih dahulu');
      return;
    }
    FetchData.addMovie({ id: id, title: title, poster: src, watched: false }, user)
    .then(res => {
      console.log(res);
      alert('Film telah tersimpan');
    })
  };
  const handleWatched = () => {
    if(!user) {
      alert('Mohon login terlebih dahulu');
      return;
    }
    FetchData.watchedMovie(id, user)
    .then(res => {
      console.log(res);
      alert('Status film terubah');
      setRefresh(!refresh);
    })
  }
  const button_conditional = (saved) ? (
    <>
      <button onClick={handleWatched}>{(saved.watched) ? 'watched' : 'not watched'}</button>
    </>
  ) : (
    <button onClick={clickHandler}>Add to library</button>
  );
  return (
    <Col key={'c-' + keyprop} xs={size}>
      <Card key={'crd-' + keyprop}>
        <Card.Body key={'crbdy-' + keyprop} className='row'>
          <Col  key={'c3-' + keyprop} xs='3'><img className='w-100' src={src} /></Col>
          <Col key={'c-7' + keyprop} xs='7'>
            <Card.Title keyprop={'crttl-' + keyprop}>{title}</Card.Title>
          </Col>
          <Col key={'c-2' + keyprop} xs='2'>{button_conditional}</Col>
        </Card.Body>
      </Card>
    </Col>
  )
}