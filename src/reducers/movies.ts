import { ActionWithPayload, createReducer } from '../redux/utils';

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

export const moviesLoader = (movies: Movie[]) => ({
  type: 'movies/loaded',
  payload: movies,
});

export const moviesLoading = () => ({
  type: 'movies/loading',
});

const moviesReducer = createReducer<MoviesState>(initialState, {
  'movies/loaded': (state, action: ActionWithPayload<Movie[]>) => {
    console.log(state);
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
