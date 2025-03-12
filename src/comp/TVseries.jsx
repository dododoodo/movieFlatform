import React, { useContext, useState, useEffect } from 'react'
import { MyContext } from '../state';
import { tvList } from '../state';

function TVseries() {
    const { series } = useContext(MyContext); // series 목록 가져오기
    const { tvSearch, searchTVSeries } = tvList(); // zustand에서 전체목록,검색 가져오기
    const [state, setState] = useState('all'); // 현재 상태 정의하기
    const [tvseries, settvSeries] = useState(series); // tv 시리즈 목록 상태 정의하기
    const [page, setPage] = useState(1); // 현재 페이지 상태 정의하기
    
    // 상태에 따라서 목록 업데이트하기
    useEffect(() => {
            if (state === 'search') {
                // 검색내용만 가져오세요
                settvSeries(searchTVSeries);
            } else {
                // 다 가져오세요
                settvSeries(series);
            }
        }, [state, series, searchTVSeries]);

    // more 버튼
    const moreSeries = async () => {
        const nextPage = page + 1; // 페이지 숫자 더하기
        setPage(nextPage); // 페이지 상태 업데이트
        // tvList에서 전체 리스트 빼오고, 페이지 더한 값 가져오기 (store.getState()사용)
        await tvList.getState().allList(nextPage);

        // 바뀐 시리즈 목록 변수로 빼서 가져오기
        const newSeries = tvList.getState().tvSeries;
        // 시리즈 목록 상태 업데이트하기
        settvSeries(newSeries);
        }

    
    return (
        <div className='container'>
            <h4>TV Series</h4>
            <form className='search' onSubmit={(e) => {
                e.preventDefault();
                tvSearch(e.target.search.value);
                setState('search');
            }}>
                <input type="text" placeholder='Enter keyword' name='search'/>
                <button>search</button>
            </form>

            <div className='movieList2'>
                {
                    tvseries.map((item, index) => (
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
                                <b style={{width:'200px'}}>{item.name}</b>
                            </li>
                        </ul>
                    ))
                }

            </div>
                <button className='more' onClick={moreSeries}>Load more</button>
        </div>
    )

};


export default TVseries