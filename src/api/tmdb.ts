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

export const client = {
  async getConfiguration() {
    return get<Configuration>("/configuration");
  },

  async getNowPlaying(pageNumber: number = 1): Promise<PageDetails<MovieDetails>> {
    const response = await get<PageResponse<MovieDetails>>(`/movie/now_playing?page=${pageNumber}`);
    const { results, page, total_pages: totalPages } = response;

    return { results, page, totalPages };
  },
};
