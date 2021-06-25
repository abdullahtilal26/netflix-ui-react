import React ,{ useState ,useEffect} from 'react';
import axios from './axios';
import "./Row.css"
import Youtube from "react-youtube";
import movieTrailer from 'movie-trailer'

 const baseurl="https://image.tmdb.org/t/p/original/";

function Row({title,fetchUrl,isLargeRow}) {/*samename as passed*/
    

    const [movies,setMovies]=useState([]);
    const [trailerUrl,setTrailerUrl]=useState("");

    useEffect(()=>{
        
        async function fetchData(){
           
            const request=await axios.get(fetchUrl);
            setMovies(request.data.results);
            //console.log(movies);
            //https://api.themoviedb.org/3/discover/tv?api_key=f5057886d8e7b4b7d6cfa3d36f44fde3&with_networks=213
            return request;
        }
        fetchData();
    },[fetchUrl])/*why pass fetchurl here?*/


    const opts={
        heigh:"390",
        width:"100%",
        pllayerVars:{
            autoplay:1,
        }
    }
    /*const handleClick=(movie)=>{
        if(trailerUrl){
            setTrailerUrl('');
        }
        else{
            movieTrailer(movie?.name||"")
            .then((url)=>{
                const urlParams=new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));
                console.log(trailerUrl);
            })
            .catch((error)=>console.log(error));
        }

    }*/
    const handleClick = (movie) => {
        console.log(movie);
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
        //movieTrailer(null,{tmdbId:movie.id}).then(response=>console.log(response));
      /*movieTrailer(movie?.name||"")*/
      movieTrailer(null,{tmdbId:movie.id})
        .then(response => {
            //console.log(response);
            
          const urlParams = new URLSearchParams(new URL(response).search);
         setTrailerUrl(urlParams.get("v"));
        
        })
        .catch((error) => console.log(error));
        
    }
  };

    return (
        <div className="row">
            <h2>{title}</h2>
            
            <div className="row_posters">
                {console.log(movies)}
                {movies.map((movie)=>{
                    return <img  
                        key={movie.id}
                        onClick={()=>handleClick(movie)}
                        className={`row_poster ${isLargeRow&&"row_posterLarge"}`}
                        src={`${baseurl}${isLargeRow?movie.poster_path:movie.backdrop_path}`} alt={movie.name}/>
                    })
                }
            </div>

            {trailerUrl&&<Youtube videoId={trailerUrl} opts={opts}/>}

           
        </div>
    )
}

export default Row

