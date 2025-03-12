import { NavLink, Routes, Route } from 'react-router-dom';

import Main from './Main';
import Movie from './Movie';
import TVseries from './TVseries';

function All() {

  const scrollTop = () => {
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  }
  
  return (
      <>
        <header>
          <NavLink className='link2' to="/"><h2>DFLIX</h2></NavLink>
          <div>
            <NavLink className='link' to="/">Home</NavLink>
            <NavLink className='link' to="/Movie">Movies</NavLink>
            <NavLink className='link' to="/TVseries">TV Series</NavLink>
          </div>
        </header>

          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/Movie" element={<Movie />} />
            <Route path="/TVseries" element={<TVseries />} />
          </Routes>

          <button className='topBtn' onClick={scrollTop}>TOP</button>

          <footer>
            <a onClick={scrollTop} style={{ cursor: 'pointer' } }>
              <h2>DOFLIX</h2>
            </a>
              <ul>
                <li><a href="">HOME</a></li>
                <li><a href="">Live</a></li>
                <li><a href="">You must watch</a></li>
                <li><a href="">Contact us</a></li>
                <li><a href="">FAQ</a></li>
                <li><a href="">Recent release</a></li>
                <li><a href="">Term of services</a></li>
                <li><a href="">Premium</a></li>
                <li><a href="">Top IMDB</a></li>
              </ul>
          </footer>
        </>
  );
}

export default All;
