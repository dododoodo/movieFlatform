import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { create } from "zustand";

const instance1 = axios.create({
  baseURL:
    "https://api.themoviedb.org/3/movie/popular?api_key=115cdd99353eeb8c6e46382cabe89afc&language=ko-KR&page=1",
});
const instance2 = axios.create({
  baseURL:
    "https://api.themoviedb.org/3/tv/popular?api_key=115cdd99353eeb8c6e46382cabe89afc&language=ko-KR&page=1",
});

// contextapi로 전역 상태 관리
export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [content, setContent] = useState([]); // movie
    const [series, setSeries] = useState([]); // tv series
    const [loading, setLoading] = useState(true); // 로딩 상태 만들기

    // useEffect 훅 (popular)
    useEffect(() => {
        const fetchMovie = async () => {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=115cdd99353eeb8c6e46382cabe89afc&language=ko-KR&page=1`
        );
        setData(response.data.results); // 영화 데이터 저장
        setLoading(false); // 로딩을 false로 설정해서 로딩끝
        };
        fetchMovie(); // 패치하기
    }, []);

    // useEffect 훅 (upcoming)
    useEffect(() => {
        const fetchMovieList = async () => {
        const source = await axios.get(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=115cdd99353eeb8c6e46382cabe89afc&language=ko-KR&page=1`
        );
        setContent(source.data.results);
        };
        fetchMovieList();
    }, []);

    // useEffect 훅 (TV series)
    useEffect(() => {
        const fetchTVSeries = async () => {
        const source = await axios.get(
            `https://api.themoviedb.org/3/tv/popular?api_key=115cdd99353eeb8c6e46382cabe89afc&language=ko-KR&page=1`
        );
        setSeries(source.data.results);
        };
        fetchTVSeries();
    }, []);

    return (
        // 자식들한테 전달
        <MyContext.Provider value={{ data, setData, content, setContent, setSeries, series, loading }}>
        {children}
        </MyContext.Provider>
    );
};

// zustand로 영화 리스트 관리하기(movie)
export const movieList = create((set,get) => ({
    movie: [], // 전체 영화
    searchMovie: [], // 검색된 영화
    loading: false,

    // 모든 영화 빼오기
    allList: () => {
        set({ loading: true });
        const currentPage = get('').page;

        instance1.get('').then((res) => {
            const fData = res.data.results.filter((item) => item.poster_path !== "");
            
            set((state)=>({
                movie: [...state.movie, ...fData],
                loading: false
            })); // 영화목록 저장 및 로딩끝
        });
        },

        // 영화 검색
        movieSearch: (value) => {
            let searchData;
            set((state) => {
            if (state.movie.length == 0) { // 영화 목록이 비었을 때
                instance1.get("/").then((res) => {
                    const fData = res.data.results.filter(
                        (item) => item.poster_path !== "");
                    set({ movie: fData });
                });
            }
            // 입력한 값의 타이틀이 포함되는 영화를 필터링
            searchData = state.movie.filter((item) =>
                item.title.includes(value)
            );
            return { searchMovie: searchData }; // 검색된 영화 빼기
            });
            return { searchMovie: searchData }; // state에서 또 빼기
        },
}));

// zustand로 tv리스트 불러오기 (tv)
export const tvList = create((set, get) => ({ 
    tvSeries: [], // 전체 시리즈
    searchTVSeries: [], // 검색된 시리즈
    loading: false,

    // 모든 시리즈 빼오기
    allList: async () => {
        set({ loading: true });
        const res = await instance2.get("/");
        const fData = res.data.results.filter((item) => item.poster_path !== "");
        // zustand 상태 업데이트
        set((state) => ({
            // 기존 tv 시리즈 목록에 fData 추가하기
            tvSeries: [...state.tvSeries, ...fData],
            loading: false,
            page: state.page + 1
        }));
        
    },

    // 시리즈 검색하기
    tvSearch: async (value) => {
        let tvSeries = get().tvSeries; // 현재 시리즈 빼오기
        if (tvSeries.length === 0) { // 목록에 아무것도 없을때,
            const res = await instance2.get("/");
            const fData = res.data.results.filter((item) => item.poster_path !== "");
            set({ tvSeries: fData });
            tvSeries = fData;
        }
        // 인풋 값에 name이 포함되는 시리즈를 빼와라
        const searchData = tvSeries.filter((item) => item.name.includes(value));
        // 검색된 시리즈 저장하기
        set({ searchTVSeries: searchData });
    }
}));



