import { useContext } from 'react';
import { MyContext } from '../state';
import '../Style.scss';
import '../Relstyle.scss';
import Movies from './Movies';

function Main() {
  const { data, loading } = useContext(MyContext);
  

  // 로딩 상태
  if (loading) {
    return <div className='loading'>Loading...</div>;
  }
  const mainMovie = data[0]

  return (
    <>
    <div className="movieBack" style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${mainMovie.backdrop_path})`,
        backgroundSize: 'cover'
      }}>

      {/* 배경 어둡게 */}
      <div className='box1'></div>
        
      <div className="movieContent">
        <div className="movieText">
          <h1>{mainMovie.title}</h1>
          <p>{mainMovie.overview}</p>
          <button>Watch now</button>
          <button>Watch trailer</button>
        </div>
        <div className="movieImg">
          <img src={`https://image.tmdb.org/t/p/w500${mainMovie.poster_path}`}/>
        </div>
      </div>
    </div>

      <div>
        <Movies/>
      </div>

    </>
  );
};

export default Main;
