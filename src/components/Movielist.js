import { Movie } from './Movie';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { API } from '../global';
//container(data)&presentational(view) or smart&presentational
//movielist(smart),movie(presentational)
export function Movielist() {
  const navigate = useNavigate();
  const [MovieList, setMovieList] = useState([]);
  const token = localStorage.getItem("token");
  //refresh the data,so create a function

  const getMovies = () => {
    if (token) {
      fetch(`${API}/movies`, {
        method: "GET"
      })
        .then(data => data.json())
        .then(movies => setMovieList(movies));
    }
    else {
      navigate("/")
    }
  }

  //after App component is mounted

  useEffect(() => getMovies(), []);


  //deleteMovie
  const deleteMovie = (id) => {
    fetch(`${API}/movies/${id}`, {
      method: "DELETE"
    }).then(data => getMovies())

  }
  // //edit movie
  // const editMovie = (id) => {
  //   fetch(`https://638dfe2b4190defdb753283c.mockapi.io/movies/${id}`, {
  //     method: "GET"
  //   }).then(() => navigate("/addmovieform"))

  // }
  return (
    <div>
      {/*copy existing movie and adding new movie*/}
      <div className='movie-list'>
        {MovieList.map((mv) => (
          <div key={mv._id}>
            <Movie movies={mv} id={mv._id}//render props

              deletebutton={<IconButton aria-label="delete" sx={{ marginLeft: "auto" }} color="error" onClick={() => deleteMovie(mv._id)}>
                <DeleteIcon />
              </IconButton>}
              editbutton={<IconButton aria-label="edit" sx={{ marginLeft: "auto" }} color="primary" onClick={() => navigate(`/movies/edit/${mv._id}`)}>
                <EditIcon />
              </IconButton>} />
          </div>
        ))}
      </div>
    </div>
  );
}
