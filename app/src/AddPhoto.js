import React, { useState } from "react";
import Photo from "./Photo";
import { Button, Grid, Typography, Stack } from "@mui/material";
import { useSnackbar } from "notistack";

// Esta função trata de adicionar e apagar fotos na BD
export default function AddPhoto(props) {
  const [photoName, setPhotoName] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (props.photoArray.length >= 3) {
      enqueueSnackbar('Não é possivel adicionar mais fotos', {
        preventDuplicate: false,
        variant: 'error',
      });
      return;
    }

    const data = new FormData(event.target);
    data.append("type", data.get("image").type);

    if (data.get("image").size === 0) {
      enqueueSnackbar('Por favor selecione um ficheiro', {
        preventDuplicate: false,
        variant: 'warning',
      });
      return;
    }
    if (data.get("image").size >= 5242880) {
      alert("File size is too large, maximum is 5MB");
      return;
    }

    await fetch("/api/photos/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: data,
    })
      .then((response) => response.text())
      .then((text) => {
        props.setPhotoArray((oldArray) => [...oldArray, text]);
        enqueueSnackbar("Adicionada a imagem com o ID: " + text, {
          preventDuplicate: false,
          variant: "success",
        });
      });
  };

  const handleDelete = async (id) => {
    await fetch("/api/photos/delete/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      let updatedPhotos = [...props.photoArray].filter(
        (photo_id) => photo_id !== id
      );
      props.setPhotoArray(updatedPhotos);
      enqueueSnackbar('Imagem apagada com sucesso', {
        preventDuplicate: false,
        variant: 'success',
      });
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
    <React.Fragment>
      <Grid>
        <Typography
          textAlign="left"
          color="text.primary"
          gutterBottom
          variant="h2"
          component="h1"
        >
          -&nbsp;Upload new Photo
        </Typography>
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" component="h2">
            Imagem a fazer upload:
          </Typography>
          <Stack
            sx={{ pt: 2, pb: 1 }}
            direction="row"
            alignItems="center"
            spacing={2}
          >
            <Button variant="outlined" component="label">
              Escolha um ficheiro..
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
        {props.photoArray ? (
          props.photoArray.map((id) => (
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
              <Button onClick={() => handleDelete(id)} variant="contained">
                Eliminar
              </Button>
            </Grid>
          ))
        ) : (
          <>Ainda não temos imagem</>
        )}
      </Grid>
    </React.Fragment>
  );
}
