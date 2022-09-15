import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import Photo from "./common/Photo";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material";
import Loading from "./common/Loading";

export default function Imoveis() {
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const [openModal, setOpenModal] = React.useState(false);
  const [imoID, setImoID] = React.useState();
  const theme = useTheme();

  const handleOpenModalDelete = (id) => {
    setImoID(id);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDeleteImoClick = () => {
    removeImo(imoID);

    enqueueSnackbar("Apagado o imóvel ID: " + imoID, {
      preventDuplicate: false,
      variant: "success",
    });
    setOpenModal(false);
  };

  useEffect(() => {
    let queryString = "/api/imoveis";

    if (searchParams.get("categoria") != null) {
      queryString += "?categoria=" + searchParams.get("categoria");
      if (searchParams.get("estado") != null) {
        queryString += "&estado=" + searchParams.get("estado");
      }
    } else if (searchParams.get("estado") != null) {
      queryString += "?estado=" + searchParams.get("estado");
    }

    setLoading(true);

    fetch(queryString)
      .then((response) => response.json())
      .then((data) => {
        setImoveis(data);
        setLoading(false);
      });
  }, [searchParams]);

  //Remove o imovel
  const removeImo = async (id) => {
    await fetch(`/api/imovel/delete/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      let updatedImoveis = [...imoveis].filter((i) => i.id !== id);
      setImoveis(updatedImoveis);
    });
  };

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ pt: 1, pb: 5 }}>
        {/* Variant é o estilo aplicado, h1 é o que aparece html */}
        <Typography sx={{ my: 3 }} variant="h4" component="h1">
          Lista de imóveis
        </Typography>
        {imoveis.map((imovel) => (
          <Grid
            container
            key={imovel.id}
            sx={{
              backgroundColor:
                theme.palette.mode === "light" ? "white" : "#35363a",
              mb: 3,
            }}
          >
            <Grid item xs={12} sm={5} md={4} lg={3} sx={{ padding: 1 }}>
              {imovel.imagens[0] ? (
                <Photo id={imovel.imagens[0]} />
              ) : (
                <img
                  draggable="false"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  alt="no-img"
                  src="/no-image.jpg"
                />
              )}
            </Grid>
            <Grid item xs={12} sm={7} md={8} lg={9} sx={{ padding: 1 }}>
              <Grid container>
                <Grid item xs={8} md={10}>
                  <Typography gutterBottom variant="h6">
                    {imovel.titulo}
                  </Typography>
                  <Typography gutterBottom>
                    {imovel.tipo}, {imovel.tipologia}
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    {imovel.estado}
                  </Typography>
                  <Typography>Ano: {imovel.ano}</Typography>
                  <Stack
                    sx={{ py: 2 }}
                    direction="row"
                    alignItems="center"
                    spacing={2}
                  >
                    <Button
                      component={Link}
                      to={"/imovel/" + imovel.id}
                      variant="contained"
                    >
                      abrir
                    </Button>
                    <Button
                      component={Link}
                      to={"/imovel/editar/" + imovel.id}
                      variant="contained"
                    >
                      editar
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleOpenModalDelete(imovel.id)}
                    >
                      apagar
                    </Button>
                  </Stack>
                </Grid>
                <Grid item xs={4} md={2}>
                  <Typography variant="h6" sx={{ textAlign: "right" }}>
                    {imovel.preco} €
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
        <Stack direction="column" sx={{ mt: 7, mb: 2 }}>
          <Button
            component={Link}
            to="/imovel/adicionar"
            variant="contained"
            color="primary"
          >
            adicionar imóvel
          </Button>
        </Stack>
      </Container>
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Tem a certeza que quer eliminar?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Apagar um anúncio faz com que este seja apagado da base de dados.
            Não será possível recuperar o conteúdo depois de apagar.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button onClick={handleDeleteImoClick} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
