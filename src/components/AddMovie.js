
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from '../global';
const movievalidationSchema = yup.object({
  name: yup
    .string()
    .required(),
  poster: yup
    .string()
    .required().min(4),
  rating: yup
    .number()
    .required().min(0).max(10),
  summary: yup
    .string()
    .required().min(20),
  trailer: yup
    .string()
    .required().min(4).url()
})

export function AddMovie() {
  //navigate hook
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      poster: "",
      rating: "",
      summary: "",
      trailer: ""
    },
    validationSchema: movievalidationSchema,
    onSubmit: (newMovie) => {
      // console.log("form values", newMovie);
      addMovie(newMovie);
    },
  })

  const addMovie = (newMovie) => {
    // const newMovie = {
    //   name: name,
    //   poster: poster,
    //   rating: rating,
    //   summary: summary,
    //   trailer: trailer
    // };

    // setMovieList([...MovieList, newMovie]);
    //POST
    fetch(`${API}/movies`, {
      method: "POST",
      body: JSON.stringify(newMovie),
      headers: { "Content-type": "application/json" },
    }).then(() => navigate("/movies"))
  };

  return (
    <form className="add-movie-form" onSubmit={formik.handleSubmit}>
      <TextField
        label="Name"
        variant="outlined"
        value={formik.values.name}
        name="name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && formik.errors.name}
        helperText={formik.touched.name && formik.errors.name ? formik.errors.name : null}
      />
      {/* {formik.touched.name && formik.errors.name ? formik.errors.name : null} */}
      <TextField
        label="Poster URL"
        variant="outlined"
        value={formik.values.poster}
        name="poster"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.poster && formik.errors.poster}
        helperText={formik.touched.poster && formik.errors.poster ? formik.errors.poster : null}
      />
      {/* {formik.touched.poster && formik.errors.poster ? formik.errors.poster : null} */}
      <TextField
        label="Rating"
        variant="outlined"
        value={formik.values.rating}
        name="rating"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.rating && formik.errors.rating}
        helperText={formik.touched.rating && formik.errors.rating ? formik.errors.rating : null}
      />
      {/* {formik.touched.rating && formik.errors.rating ? formik.errors.rating : null} */}
      <TextField
        label="Summary"
        variant="outlined"
        value={formik.values.summary}
        name="summary"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.summary && formik.errors.summary}
        helperText={formik.touched.summary && formik.errors.summary ? formik.errors.summary : null}
      />
      {/* {formik.touched.summary && formik.errors.summary ? formik.errors.summary : null} */}
      <TextField
        label="Trailer"
        variant="outlined"
        value={formik.values.trailer}
        name="trailer"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.trailer && formik.errors.trailer}
        helperText={formik.touched.trailer && formik.errors.trailer ? formik.errors.trailer : null}
      />
      {/* {formik.touched.trailer && formik.errors.trailer ? formik.errors.trailer : null} */}
      <Button variant="contained" type="submit" >Add Movie</Button>

    </form>
  );
}

