import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'

import './style.css'

function Movie() {
  const { id } = useParams()
  const navigate = useNavigate()

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
        navigate('/', { replace: true })
        return
      })
    }

    loadFilme()

    return () => {
      console.log('componente desmontado')
    }
  }, [id, navigate])

  function saveMovie() {
    const myMovieList = localStorage.getItem('@primeflix')
    let savedMovies = JSON.parse(myMovieList) || []
    const hasMovie = savedMovies.some((savedMovie) => savedMovie.id === movie.id)

    if(hasMovie) {
      alert('Filme já salvo!')
      return
    }

    savedMovies.push(movie)
    localStorage.setItem('@primeflix', JSON.stringify(savedMovies))
    alert('Filme salvo com sucesso!')
  }

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
        <button onClick={saveMovie}>Salvar</button>
        <button>
          <a href={`https://youtube.com/results?search_query=Trailer+${movie.title}`} target="_blank" rel="noreferrer" >
            Trailer
          </a>
        </button>
      </div>
    </div>
  )
}

export default Movie