import React, { useContext,useState,useEffect } from 'react';
import { movieList } from '../state';
import { MyContext } from '../state';

function Movie() {
    const { data } = useContext(MyContext); // movie 목록 가져오기
    const { movieSearch, searchMovie } = movieList(); // zustand에서 검색내용 가져오기
    const [state, setState] = useState('all'); // 현재 상태 정의하기 
    const [list, setList] = useState(data); // 현재 movie 목록 정의하기
    const [page, setPage] = useState(1); // 현재 페이지 상태 정의하기

    // 상태에 따른 목록 업데이트
    useEffect(() => {
        if (state === 'search') { // 검색 상태일때는
            setList(searchMovie); // 검색한 내용만 가져오세요
        } else {
            setList(data); // 아니면 다 가져오세요
        }
    }, [state, data, searchMovie]);

    // more 버튼
    const moreMovies = async () => {
        setPage((page) => page + 1); // 페이지 상태 업데이트
        // movieList에서 모든 영화 목록 불러오기 (store.getState() 사용)
        await movieList.getState().allList();

        // 바뀐 영화 목록 변수로 빼서 가져오기
        const newMovies = movieList.getState().movie;
        // 새로운 영화 목록을 기존 목록에 추가
        setList((prevList) => [...prevList, ...newMovies]);
    };

    return (
        <div className='container'>
            <h4>Movies</h4>
            <form className='search' onSubmit={(e) => {
                e.preventDefault();
                movieSearch(e.target.search.value); // 검색한 값 빼오기
                setState('search'); // 상태를 'search'로 바꾸기
            }}>
                <input type="text" placeholder='Enter keyword' name='search'/>
                <button>search</button>
            </form>

            <div className='movieList2' style={{backgroundColor:'black'}}>
                {
                    list.map((item, index) => (
                        <ul key={index}>
                            <li>
                                <a href="#">
                                    <div className="movieThumb2">
                                        <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`}/>
                                        <div className="youtube2">
                                            <img src="./youtube.png" style={{width:'70px'}} />
                                        </div>
                                    </div>
                                </a>
                                <b>{item.title}</b>
                            </li>
                        </ul>
                    ))
                }
            </div>

            <button className='more' onClick={moreMovies}>Load more</button>
        </div>
    );
}



export default Movie