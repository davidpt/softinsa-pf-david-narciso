import React from "react";
import Photo from "../common/Photo";
import { Button, Grid, Typography, Stack } from "@mui/material";
import { useSnackbar } from "notistack";

// Esta função trata de adicionar e apagar fotos na BD
export default function AddPhoto(props) {
  const { enqueueSnackbar } = useSnackbar();

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
      enqueueSnackbar("Imagem apagada com sucesso", {
        preventDuplicate: false,
        variant: "success",
      });
    });
  };

  async function onImageChangeUpload(event) {
    const image = event.target.files[0];

    if (image != null) {
      const data = new FormData();
      data.append("image", image);
      data.append("type", image.type);

      if (data.get("image").size >= 5242880) {
        enqueueSnackbar("Ficheiro demasiado grande, o máximo é 5MB", {
          preventDuplicate: false,
          variant: "warning",
        });
        // this line right below will reset the
        // input field so if you removed it you can re-add the same file
        event.target.value = "";
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
      // this line right below will reset the
      // input field so if you removed it you can re-add the same file
      event.target.value = "";
    }
  }

  return (
    <React.Fragment>
      <Grid>
        <Stack sx={{ pt: 2 }} direction="column" spacing={2}>
          <Typography variant="h4" component="h2" sx={{ pt: 2, pb: 2 }}>
            Imagens
          </Typography>
          <Button variant="outlined" component="label">
            Escolha um ficheiro..
            <input
              type="file"
              name="image"
              accept="image/png, image/jpeg, image/webp"
              hidden
              onChange={onImageChangeUpload}
            />
          </Button>
          <Typography variant="body1" gutterBottom>
            Limite de 5MB por imagem!
          </Typography>
        </Stack>
      </Grid>

      <Grid sx={{ pb: 2 }} container>
        {props.photoArray ? (
          props.photoArray.map((id) => (
            <Grid
              sx={{
                padding: 1,
                maxHeight: "350px",
                mb: 6,
              }}
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
      {/* <Button variant="contained" component="label">
        Upload
        <input hidden type="submit" />
      </Button> */}
    </React.Fragment>
  );
}
