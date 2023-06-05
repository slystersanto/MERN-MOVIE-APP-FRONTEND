
import './App.css';
import { useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { AddMovie } from './components/AddMovie';
import { Movielist } from './components/Movielist';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { MovieDetails } from './components/MovieDetails';
import { Home } from './components/Home';
import { NotFound } from './components/NotFound';
import { MovieEdit } from './components/MovieEdit';
import { Login } from './components/login';
import Register from './components/register';
import { UserProvider } from './context/UserContext';
import { ToastContainer } from 'react-toastify';
import Activation from './components/Activation';
import { Forgotpassword } from './components/forgotpassword';
import Verification from './components/verification';
import ChangePassword from './components/changepassword';




function App() {
  // const [MovieList, setMovieList] = useState([]);
  const navigate = useNavigate();
  const [mode, setMode] = useState("dark");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  const doLogout = () => {
    if (window.confirm("Do you really want to Logout?")) {
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    }
  }

  const token = localStorage.getItem("token");
  return (
    <ThemeProvider theme={darkTheme}>
      <Paper style={{ minHeight: "100vh", borderRadius: "0" }} elevation={4}>
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <Button onClick={() => navigate("/home")} color="inherit">Home</Button>
              <Button onClick={() => navigate("/movies")} color="inherit">Movies</Button>
              {token ? <Button onClick={() => navigate("/addmovieform")} color="inherit">Add Movie</Button> : null}
              <Button sx={{ marginLeft: "auto" }} startIcon={mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />} onClick={() => setMode(mode === "light" ? "dark" : "light")} color="inherit">{mode === "light" ? "dark" : "light"} mode</Button>
              {token ? <Button onClick={() => { doLogout() }} color="inherit">Logout</Button> : null}
            </Toolbar>
          </AppBar>
          <UserProvider>

            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/user/activation/:userId" element={<Activation />} />
              <Route path='/ForgotPassword' element={<Forgotpassword />} />
              <Route path='/Verification' element={<Verification />} />
              <Route path='/ChangePassword' element={<ChangePassword />} />
              <Route path="/home" element={<Home />} />
              <Route path="/movies/:id" element={<MovieDetails />} />
              <Route path="/films" element={<Navigate replace to="/movies" />} />
              <Route path="/movies" element={<Movielist />} />
              <Route path="/addmovieform" element={<AddMovie />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/movies/edit/:id" element={<MovieEdit />} />
            </Routes>
          </UserProvider>
        </div>
      </Paper>
    </ThemeProvider >
  );
}

export default App;
