// ✅ OMDb Config
export const OMDB_CONFIG = {
  BASE_URL: "https://www.omdbapi.com",
  API_KEY: process.env.EXPO_PUBLIC_OMDB_API_KEY, // keep your OMDb key in .env
};





// ✅ Fetch movies (search or default)
export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${OMDB_CONFIG.BASE_URL}/?apikey=${OMDB_CONFIG.API_KEY}&s=${encodeURIComponent(query)}`
    : `${OMDB_CONFIG.BASE_URL}/?apikey=${OMDB_CONFIG.API_KEY}&s=new`; 
    // OMDb doesn’t have discover/popularity – so we fake a default search

  const response = await fetch(endpoint, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Error fetching movies: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "No results found");
  }

  return data.Search; // 🔹 Important difference from TMDB (TMDB used data.results)
};





// ✅ Optional: Fetch full details by IMDb ID
export const fetchMovieDetails = async ({ imdbID }: { imdbID: string }) => {
  const endpoint = `${OMDB_CONFIG.BASE_URL}/?apikey=${OMDB_CONFIG.API_KEY}&i=${imdbID}&plot=full`;

  const response = await fetch(endpoint, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Error fetching movie details: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "No details found");
  }

  return data; // full object (Title, Year, Plot, Poster, Actors, etc.)
};




