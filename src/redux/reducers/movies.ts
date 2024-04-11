import { client } from "../../api";
import { ActionWithPayload, createReducer } from "../utils";
import { AppThunk } from "../store";

export interface Movie {
  id: number;
  title: string;
  popularity: number;
  overview: string;
  image?: string;
}

interface MoviesState {
  top: Movie[];
  loading: boolean;
  page: number;
  hasMorePage: boolean;
}

const initialState: MoviesState = {
  top: [],
  loading: false,
  page: 0,
  hasMorePage: true,
};

const moviesLoader = (movies: Movie[], page: number, hasMorePage: boolean) => ({
  type: "movies/loaded",
  payload: { movies, page, hasMorePage },
});

const moviesLoading = () => ({
  type: "movies/loading",
});

export function fetchNextPage(): AppThunk<Promise<void>> {
  return async (dispatch, getState) => {
    const nextPage = getState().movies.page + 1;
    dispatch(fetchPage(nextPage));
  };
}

function fetchPage(pageNumber: number): AppThunk<Promise<void>> {
  return async (dispatch) => {
    dispatch(moviesLoading());

    const config = await client.getConfiguration();
    const imgUrl = config.images.base_url;
    const { results, page, totalPages } = await client.getNowPlaying(pageNumber);

    const mappedResult: Movie[] = results.map((item) => ({
      ...item,
      image: item.backdrop_path ? `${imgUrl}w780${item.backdrop_path}` : undefined,
    }));

    const hasMorePage = page < totalPages;

    dispatch(moviesLoader(mappedResult, pageNumber, hasMorePage));
  };
}

const moviesReducer = createReducer<MoviesState>(initialState, {
  "movies/loaded": (
    state,
    action: ActionWithPayload<{ movies: Movie[]; page: number; hasMorePage: boolean }>
  ) => {
    return {
      ...state,
      top: [...state.top, ...action.payload.movies],
      page: action.payload.page,
      hasMorePage: action.payload.hasMorePage,
      loading: false,
    };
  },
  "movies/loading": (state, action) => {
    return {
      ...state,
      loading: true,
    };
  },
});

export default moviesReducer;
