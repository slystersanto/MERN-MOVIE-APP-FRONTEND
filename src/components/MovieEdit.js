
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
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

export function MovieEdit() {

    /*get the id from route path*/
    const { id } = useParams();
    //const movie = MovieList[id];
    const [movie, setMovie] = useState(null);

    //after App component is mounted
    useEffect(() => {
        fetch(`${API}/movies/${id}`, {
            method: "GET"
        })
            .then(data => data.json())
            .then(movie => setMovie(movie));
    }, [])
    return (
        <div>
            {movie ? <MovieEditForm movie={movie} /> : "Loading..."}
        </div>
    )
}

export function MovieEditForm({ movie }) {
    const formik = useFormik({
        initialValues: {
            name: movie.name,
            poster: movie.poster,
            rating: movie.rating,
            summary: movie.summary,
            trailer: movie.trailer
        },
        validationSchema: movievalidationSchema,
        onSubmit: (updatedMovie) => {
            // console.log("form values", updatedMovie);
            editMovie(updatedMovie);
        },
    })
    //navigate hook
    const navigate = useNavigate();
    const editMovie = (updatedMovie) => {
        // const newMovie = {
        //   name: name,
        //   poster: poster,
        //   rating: rating,
        //   summary: summary,
        //   trailer: trailer
        // };

        // setMovieList([...MovieList, newMovie]);
        //POST
        fetch(`${API}/movies/${movie._id}`, {
            method: "PUT",
            body: JSON.stringify(updatedMovie),
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
            <Button variant="contained" type="submit"  >Save Movie</Button>

        </form>
    );
}

