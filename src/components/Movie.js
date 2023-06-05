import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import { Counter } from './Counter';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import ReactPlayer from 'react-player';

export function Movie({ movies, id, deletebutton, editbutton }) {
  const ratingColor = movies.rating >= 8.5 ? 'green' : 'red';
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  return (
    <Card className='movie-container'>
      <div className="movie-poster">
        <ReactPlayer url={movies.trailer} controls={true} width="100%" height="100%" />
      </div>
      <CardContent>
        <div className='movie-specs'>
          <Typography variant='h5' component='h2' className='movie-name'>
            {movies.name}
            <IconButton onClick={() => setShow(!show)} color='primary' aria-label='toggle'>
              {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
            <IconButton onClick={() => navigate(`/movies/${id}`)} color='primary' aria-label='toggle'>
              <InfoIcon />
            </IconButton>
          </Typography>
          <Typography variant='body1' style={{ color: ratingColor }} className='movie-rating'>
            ⭐ {movies.rating}
          </Typography>
        </div>
        {show && (
          <Typography variant='body2' className='movie-summary'>
            {movies.summary}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Counter />
        {editbutton}
        {deletebutton}
      </CardActions>
    </Card>
  );
}
