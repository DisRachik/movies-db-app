import configuration from "../configuration";

async function get<TBody>(currentUrl: string): Promise<TBody> {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${configuration.apiToken}`,
    },
  };

  const res = await fetch(`${configuration.apiUrl}/3${currentUrl}`, options);

  return res.json() as TBody;
}

export interface MovieDetails {
  id: number;
  title: string;
  popularity: number;
  overview: string;
  backdrop_path?: string;
}

interface PageResponse<TResult> {
  page: number;
  results: TResult[];
  total_pages: number;
  total_results: number;
}
interface PageDetails<TResult> {
  page: number;
  results: TResult[];
  totalPages: number;
}
interface Configuration {
  images: {
    base_url: string;
  };
}
export interface KeywordItem {
  id: number;
  name: string;
}

export interface MoviesFilters {
  keywords?: number[];
  genres?: number[];
}

interface IClient {
  getConfiguration: () => Promise<Configuration>;
  getNowPlaying: (page: number) => Promise<PageDetails<MovieDetails>>;
  getMovies: (page: number, filters: MoviesFilters) => Promise<PageDetails<MovieDetails>>;
  getKeywords: (query: string) => Promise<KeywordItem[]>;
}

export const client: IClient = {
  async getConfiguration() {
    return await get<Configuration>("/configuration");
  },

  async getNowPlaying(pageNumber: number = 1): Promise<PageDetails<MovieDetails>> {
    const response = await get<PageResponse<MovieDetails>>(`/movie/now_playing?page=${pageNumber}`);
    const { results, page, total_pages: totalPages } = response;

    return { results, page, totalPages };
  },

  async getMovies(pageNumber: number, filters: MoviesFilters): Promise<PageDetails<MovieDetails>> {
    const params = new URLSearchParams({
      page: pageNumber.toString(),
    });

    if (filters.keywords?.length) {
      params.append("with_keywords", filters.keywords.join("|"));
    }
    if (filters.genres?.length) {
      params.append("with_genres", filters.genres.join(","));
    }

    const response = await get<PageResponse<MovieDetails>>(`/discover/movie?${params.toString()}`);
    const { results, page, total_pages: totalPages } = response;

    return { results, page, totalPages };
  },

  async getKeywords(query: string) {
    const { results } = await get<PageResponse<KeywordItem>>(`/search/keyword?query=${query}`);

    return results;
  },
};
