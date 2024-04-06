import { client } from '../api';
import { ActionWithPayload, createReducer } from '../redux/utils';
import { AppThunk } from '../store';

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
}

const initialState: MoviesState = {
  top: [],
  loading: false,
};

const moviesLoader = (movies: Movie[]) => ({
  type: 'movies/loaded',
  payload: movies,
});

const moviesLoading = () => ({
  type: 'movies/loading',
});

export function fetchMovies(): AppThunk<Promise<void>> {
  return async (dispatch, getState) => {
    dispatch(moviesLoading());

    const config = await client.getConfiguration();
    const imgUrl = config.images.base_url;
    const results = await client.getNowPlaying();

    const mappedResult: Movie[] = results.map((item) => ({
      ...item,
      image: item.backdrop_path ? `${imgUrl}w780${item.backdrop_path}` : undefined,
    }));

    dispatch(moviesLoader(mappedResult));
  };
}

const moviesReducer = createReducer<MoviesState>(initialState, {
  'movies/loaded': (state, action: ActionWithPayload<Movie[]>) => {
    return {
      ...state,
      top: action.payload,
      loading: false,
    };
  },
  'movies/loading': (state, action) => {
    return {
      ...state,
      loading: true,
    };
  },
});

export default moviesReducer;
