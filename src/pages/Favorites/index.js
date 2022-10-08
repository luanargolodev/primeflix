import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './style.css'

function Favorites() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const myMovieList = localStorage.getItem('@primeflix')
    setMovies(JSON.parse(myMovieList) || [])
  }, [])

  return (
    <div className="my-movies">
      <h1>Meus filmes</h1>

      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <span>{movie.title}</span>
              <div>
                <Link to={`/movie/${movie.id}`}>Ver detalhes</Link>
                <button>Excluir</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Favorites