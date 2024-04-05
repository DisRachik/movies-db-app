import { Reducer, Action } from 'redux';

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

const moviesReducer: Reducer<MoviesState, Action> = (state, action) => {
  return initialState;
};

export default moviesReducer;
