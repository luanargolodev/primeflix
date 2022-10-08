import { useEffect, useState } from 'react'
import api from '../../services/api'

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

      console.log(response.data)
    }

    loadMovies()
  }, [])

  return (
    <div>
      <h1>BEM VINDO A HOME</h1>
    </div>
  )
}

export default Home