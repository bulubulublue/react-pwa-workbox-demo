import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Movie from './movie'

const Movies = () => {
    const [movies,setMovies] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        axios.get(`https://api.themoviedb.org/3/discover/tv`, {
            params: {
              sort_by: 'popularity.desc',
              api_key: process.env.API_KEY
            }
          })
            .then( (response) => {
              setLoading(false);
              setMovies(response?.data?.results);
            })
            .catch( (error) => {
              setLoading(false);
              console.log(error);
            })
    },[])

    return (
        <div className='flex flex-wrap -mb-4'>
            {
              !loading && movies?.length 
              ? movies.map((movie)=> <Movie key={movie.id} movie={movie}/>)
              : <h2>Loading</h2>
            }
        </div>
    )
}

export default Movies