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
}

const initialState: MoviesState = {
  top: [
    {
      id: 1,
      title: 'The Fast and the Furious',
      popularity: 98,
      overview: 'About the speed ...',
    },
    {
      id: 2,
      title: 'The Godfather',
      popularity: 97,
      overview: 'About criminals ...',
    },
    {
      id: 3,
      title: 'Inception',
      popularity: 90,
      overview: 'About the something ...',
    },
    {
      id: 4,
      title: 'The Dark Knight',
      popularity: 99.5,
      overview: 'About Batman ...',
    },
  ],
};

export const moviesLoader = (movies: Movie[]) => ({
  type: 'movies/loaded',
  payload: movies,
});

const moviesReducer = createReducer<MoviesState>(initialState, {
  'movies/loaded': (state, action: ActionWithPayload<Movie[]>) => {
    console.log(state);
    return {
      ...state,
      top: action.payload,
    };
  },
});

export default moviesReducer;
