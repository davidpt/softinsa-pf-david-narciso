import React, { useState } from "react";
import Photo from "./Photo";
import { Button, Container, Grid, Typography, Stack } from "@mui/material";

function AddPhoto() {
  const [photoArray, setPhotoArray] = useState([]);
  const [photoName, setPhotoName] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (photoArray.length >= 3) {
      alert("No more photos allowed");
      return;
    }

    const data = new FormData(event.target);
    data.append("type", data.get("image").type);

    if (data.get("image").size === 0) {
      alert("Please select a file");
      return;
    }
    if (data.get("image").size >= 5242880) {
      alert("File size is too large, maximum is 5MB");
      return;
    }
    
    await fetch("/api/photos/add", {
      method: "POST",
      headers: {
        'Accept': "application/json",
      },
      body: data,
    })
      .then((response) => response.text())
      .then((text) => {
        //console.log(text);
        setPhotoArray((oldArray) => [...oldArray, text]);
      });
  };

  const handleDelete = async (id) => {
    
    console.log("vamos apagar o id: " + id);

    await fetch("/api/photos/delete/" + id, {
      method: "DELETE",
      headers: {
        'Accept': "application/json",
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedPhotos = [...photoArray].filter(photo_id => photo_id !== id);
      setPhotoArray(updatedPhotos);
      
      console.log("Resultado de apagar:");
      console.dir(photoArray);
    });

  };

  function handleFileChange(event) {
    if (event.target.files[0] != null) {
      setPhotoName(event.target.files[0].name);
    } else {
      setPhotoName("");
    }
  }

  return (
    <Container id="addPhoto" sx={{ pt: 1, pb: 5 }} maxWidth="lg">
      <Grid>
        <Typography
          textAlign="left"
          color="text.primary"
          gutterBottom
          variant="h1"
        >
          -&nbsp;Upload new Photo
        </Typography>
        <form onSubmit={handleSubmit}>
          <Typography variant="h2">Imagem a fazer upload:</Typography>
          <Stack
            sx={{ pt: 2, pb: 1 }}
            direction="row"
            alignItems="center"
            spacing={2}
          >
            <Button variant="outlined" component="label">
              Choose a file..
              <input
                type="file"
                name="image"
                accept="image/png, image/jpeg"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            <Button variant="contained" component="label">
              Upload
              <input hidden type="submit" />
            </Button>
          </Stack>
          <Typography sx={{ pb: 2 }} variant="body1">
            {photoName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Limite de 5MB por imagem!
          </Typography>
        </form>
      </Grid>

      <Grid container>
        {photoArray ? (
          photoArray.map((id) => (
            <Grid
              sx={{ padding: 2 }}
              style={{ maxHeight: "50vh" }}
              textAlign="center"
              xs={6}
              lg={4}
              key={id}
              item
            >
              <Photo id={id} />
              <Button onClick={() => handleDelete(id)} variant="contained">Eliminar</Button>
            </Grid>
          ))
        ) : (
          <>Ainda não temos imagem</>
        )}
      </Grid>
    </Container>
  );
}

export default AddPhoto;
