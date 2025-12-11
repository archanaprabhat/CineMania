
const fs = require('fs');
const path = require('path');

const moviesPath = path.join(__dirname, '../data/movies.json');
const showsPath = path.join(__dirname, '../data/shows.json');
const actorsPath = path.join(__dirname, '../data/actors.json');

const movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));
const shows = JSON.parse(fs.readFileSync(showsPath, 'utf8'));
const actors = JSON.parse(fs.readFileSync(actorsPath, 'utf8'));

console.log(`Loaded ${movies.length} movies, ${shows.length} shows, and ${actors.length} actors.`);

// Create a map for quick lookup
const movieMap = new Map(movies.map(m => [m.id, m]));
const showMap = new Map(shows.map(s => [s.id, s]));

let updatedMoviesCount = 0;
let updatedShowsCount = 0;

actors.forEach(actor => {
  if (actor.credits && actor.credits.cast) {
    actor.credits.cast.forEach(credit => {
      const castMember = {
        id: actor.id,
        name: actor.name,
        original_name: actor.original_name,
        character: credit.character,
        profile_path: actor.profile_path,
        order: credit.order
      };

      if (credit.media_type === 'movie') {
        const movie = movieMap.get(credit.id);
        if (movie) {
          if (!movie.credits) {
            movie.credits = { cast: [], crew: [] };
          }
          if (!movie.credits.cast) {
            movie.credits.cast = [];
          }
          // Check if actor already exists in cast
          if (!movie.credits.cast.some(c => c.id === actor.id)) {
            movie.credits.cast.push(castMember);
            updatedMoviesCount++;
          }
        }
      } else if (credit.media_type === 'tv') {
        const show = showMap.get(credit.id);
        if (show) {
          if (!show.credits) {
            show.credits = { cast: [], crew: [] };
          }
          if (!show.credits.cast) {
            show.credits.cast = [];
          }
          // Check if actor already exists in cast
          if (!show.credits.cast.some(c => c.id === actor.id)) {
            show.credits.cast.push(castMember);
            updatedShowsCount++;
          }
        }
      }
    });
  }
});

// Sort cast by order (optional, but good for display)
movies.forEach(movie => {
  if (movie.credits && movie.credits.cast) {
    movie.credits.cast.sort((a, b) => a.order - b.order);
  }
});

shows.forEach(show => {
  if (show.credits && show.credits.cast) {
    show.credits.cast.sort((a, b) => a.order - b.order);
  }
});

fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2));
fs.writeFileSync(showsPath, JSON.stringify(shows, null, 2));

console.log(`Updated ${updatedMoviesCount} movie credits and ${updatedShowsCount} show credits.`);
console.log('Done!');
