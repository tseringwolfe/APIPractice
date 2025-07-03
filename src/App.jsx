import { useState, useEffect } from 'react';
import { Button, Container, Typography } from '@mui/material';
import TextField from "@mui/material/TextField";
import './App.css'

function App() {
  const [name, setName] = useState("");
  const[movieArray, setMovieArray] = useState([]);

  useEffect(() => {
  // Everything in here gets run once on first page load
  fetch("http://www.omdbapi.com/?s="+ name + "&apikey=cd29db11", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log("got data", data);
      setMovieArray(data.Search);
    })
    .catch((error) => console.log("error", error));
}, []);

  const requestOptions = {
  method: "GET",
  redirect: "follow"
};

  
  

  return (
    <>
    <Container maxWidth="md" sx={{ mb: 4 }}>
      <TextField
        id="outlined-controlled"
        label="Title"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
  }}
      />

      <Button 
        variant="contained"
        sx={{ margin: 2, align: "center" }}
        onClick={() => {
          fetch("http://www.omdbapi.com/?s="+ name + "&apikey=cd29db11", requestOptions)
            .then(response => response.json())
            .then(data => {
              setMovieArray(data.Search);
            })
            .catch(error => {
              console.error('Error:', error);
            });
        }}
      >
        Search
        </Button>
    </Container>

    <Container>
      {movieArray && movieArray.map((movie) => (
        <Typography>
          {movie.Title}
        </Typography>
      ))}
    </Container>

  

    </>
  )
}

export default App
