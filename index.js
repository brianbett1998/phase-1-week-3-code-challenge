const listHolder = document.getElementById('films');
document.addEventListener('DOMContentLoaded', () => {
    document.getElementsByClassName('film item')[0].remove();
    fetchMovies('http://localhost:3000/films');
});

function fetchMovies(apiUrl) {
    fetch(apiUrl)
    .then(response => response.json())
    .then(movies => {
        movies.forEach(movie => {
            displayMovie(movie);
        });
    });
}

function displayMovie(movie) {
    const list = document.createElement('li');
    list.style.cursor = "cell";
    list.textContent = movie.title;
    listHolder.appendChild(list);
    addClickEvent(list, movie.id);
}

function addClickEvent(element, id) {
    element.addEventListener('click', () => {
        fetch(`http://localhost:3000/films/${id}`)
        .then(response => response.json())
        .then(movie => {
            document.getElementById('buy-ticket').textContent = 'Buy Ticket';
            setUpMovieDetails(movie);
        });
    });
}

function setUpMovieDetails(funMovie) {
    const preview = document.getElementById('poster');
    preview.src = funMovie.poster;
    const movieTitle = document.querySelector('#title');
    movieTitle.textContent = funMovie.title;
    const movieTime = document.querySelector('#runtime');
    movieTime.textContent = `${funMovie.runtime} minutes`;
    const movieDescription = document.querySelector('#film-info');
    movieDescription.textContent = funMovie.description;
    const showTime = document.querySelector('#showtime');
    showTime.textContent = funMovie.showtime;
    const tickets = document.querySelector('#ticket-number');
    tickets.textContent = funMovie.capacity - funMovie.tickets_sold;
}

const btn = document.getElementById('buy-ticket');
btn.addEventListener('click', function(event){
    let remainingTickets = document.querySelector('#ticket-number').textContent;
    event.preventDefault();
    if (remainingTickets > 0) {
        tickets.textContent = remainingTickets - 1;
    } else {
        ntn.textCotent='Sold Out';
        btn.disabled = 'Sold Out';
    }
});
