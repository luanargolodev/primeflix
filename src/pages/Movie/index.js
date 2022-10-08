import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../services/api'

import './style.css'

function Movie() {
  const { id } = useParams()
  const [movie, setMovie] = useState({})
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function loadFilme() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: '87533c310d3e816e461feca9a728b65f',
          language: 'pt-BR'
        }
      })
      .then((response) => {
        setMovie(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log('Filme não encontrado!')
      })
    }

    loadFilme()

    return () => {
      console.log('componente desmontado')
    }
  }, [id])

  if(loading) {
    return (
      <div className="movie-info">
        <h1>Carregando detalhes...</h1>
      </div>
    )
  }

  return (
    <div className="movie-info">
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />
      
      <h3>Sinopse</h3>
      <p>{movie.overview}</p>
      <strong>Avaliação: {movie.vote_average} / 10</strong>

      <div className="area-buttons">
        <button>Salvar</button>
        <button>
          <a href="#">
            Trailer
          </a>
        </button>
      </div>
    </div>
  )
}

export default Movie