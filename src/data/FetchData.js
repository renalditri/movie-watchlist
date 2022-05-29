export default class FetchData {
  static async searchTitle(title) {
    const fetchData = await fetch(base_url + 's=' + title);
    const json = await fetchData.json();
    console.log(json);
    return json.Search;
  }

  static async fakeAuth(username, pass) {
    const fetchData = await fetch(db_url + `users?user=${username}&password=${pass}`);
    const json = await fetchData.json();
    return json;
  }

  static async getSaved(user) {
    const fetchData = await fetch(db_url + 'saved/' + user);
    const json = await fetchData.json();
    return json;
  }

  static async addMovie(movie, user) {
    const fetchData = await fetch(db_url + 'saved/' + user);
    const json = await fetchData.json();
    const newMovies = json.movies;
    newMovies.push(movie);
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movies: newMovies })
    }
    const postData = await fetch(db_url + 'saved/' + user, options);
    const jsonPost = await postData.json();
    return jsonPost;
  }

  static async watchedMovie(movieId, user) {
    const fetchData = await fetch(db_url + 'saved/' + user);
    const json = await fetchData.json();
    console.log('Change status', json);
    const newMovies = json.movies;
    const objIndex = newMovies.findIndex((obj => obj.id == movieId));
    newMovies[objIndex].watched = true;
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movies: newMovies })
    }
    const postData = await fetch(db_url + 'saved/' + user, options);
    const jsonPost = await postData.json();
    return jsonPost;
  }

  static async addUser(user) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }
    const fetchData = await fetch(db_url + 'users', options);
    const json = await fetchData.json();
    console.log(json);
    return json;
  }
}

const base_url = 'http://www.omdbapi.com/?apikey=ce2b061d&';
const db_url = 'http://localhost:3004/';