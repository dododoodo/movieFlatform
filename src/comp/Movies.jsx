import { useContext } from 'react';
import { MyContext } from '../state';
import { useNavigate } from 'react-router-dom';

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import '../Style.scss';


function Movies() {
  const { data, content, series } = useContext(MyContext);
  const navigate = useNavigate();

  // useNavigate 훅 사용하기
  function moviePage() {
    navigate('/movie');
  }
  function tvPage() {
    navigate('/TVseries');
  }
  

  return (
    <div style={{backgroundColor:'#0b0b0b', height:'auto'}}>
      <div className='moviesTitle'>
        <h2>Trending Movies</h2>
        <button onClick={moviePage}>view more</button>
      </div>


      <div className="movieList">
      <Swiper className="mySwiper" spaceBetween={70} slidesPerView={6} loop={true}
        breakpoints={{ 1290: {slidesPerView: 6}, 1070: {slidesPerView: 5}, 800: {slidesPerView: 4},
        650: {slidesPerView: 3},365: {slidesPerView: 2},150: {slidesPerView: 1, spaceBetween:1} }}>
          {
            data.map((item, index) => (
              <SwiperSlide key={index}>
                <a href="http://youtube.com" target='_blank'>
                  <div className="movieThumb">
                    <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} />

                    <div className="youtube">
                      <img src="./youtube.png" style={{width:'70px'}}/>
                    </div>
                  </div>
                </a>
                <b>{item.title}</b>
              </SwiperSlide>
            ))
          }
        </Swiper>

        <div className='moviesTitle'>
          <h2>Upcoming Movies</h2>
          <button onClick={moviePage}>view more</button>
        </div>
        <Swiper className="mySwiper" spaceBetween={70} slidesPerView={6} loop={true}
        breakpoints={{ 1290: {slidesPerView: 6}, 1050: {slidesPerView: 5}, 800: {slidesPerView: 4},
        650: {slidesPerView: 3},365: {slidesPerView: 2},150: {slidesPerView: 1, spaceBetween:1} }}>
          {
            content.map((item, index) => (
              <SwiperSlide key={index}>
                <a href="http://youtube.com" target='_blank'>
                  <div className="movieThumb">
                    <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} />

                    <div className="youtube">
                      <img src="./youtube.png" style={{width:'70px'}}/>
                    </div>
                  </div>
                </a>
                <b>{item.title}</b>
              </SwiperSlide>
            ))
          }
        </Swiper>


        <div className='moviesTitle'>
          <h2>TV Series</h2>
          <button onClick={tvPage}>view more</button>
        </div>
        <Swiper className="mySwiper" spaceBetween={70} slidesPerView={6} loop={true}
        breakpoints={{ 1290: {slidesPerView: 6}, 1050: {slidesPerView: 5}, 800: {slidesPerView: 4},
        650: {slidesPerView: 3},365: {slidesPerView: 2},150: {slidesPerView: 1, spaceBetween:1} }}>
          {
            series.map((item, index) => (
              <SwiperSlide key={index}>
                <a href="http://youtube.com" target='_blank'>
                  <div className="movieThumb">
                    <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} />

                    <div className="youtube">
                      <img src="./youtube.png" style={{width:'70px'}}/>
                    </div>
                  </div>
                </a>
                <b>{item.title}</b>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>


    </div>
  )
}

export default Movies