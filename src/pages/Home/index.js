import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import './style.css'

function Home() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    async function loadMovies() {
      const response = await api.get('movie/now_playing', {
        params: {
          api_key: '87533c310d3e816e461feca9a728b65f',
          language: 'pt-BR',
          page: 1
        }
      })

      setMovies(response.data.results.slice(0, 10))
    }

    loadMovies()
  }, [])

  return (
    <div className="container">
      <div className="list-movies">
        {movies.map((movie) => {
          return (
            <article key={movie.id}>
              <strong>{movie.title}</strong>
              <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
              <Link to={`/movie/${movie.id}`}>Acessar</Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default Home