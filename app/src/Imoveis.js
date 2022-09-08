import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import Photo from "./Photo";

function Imoveis() {
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (id) => {
    enqueueSnackbar("Imóvel apagado com sucesso", {
      preventDuplicate: false,
      variant: "success",
    });
    remove(id);
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
  const remove = async (id) => {
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

  // function getImoveisUsados() {
  //   searchParams.set("estado", "usado");
  //   setSearchParams(searchParams);
  // }

  if (loading) {
    return (
      <div className="App-header">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ pt: 1, pb: 5 }}>
      {/* Variant é o estilo aplicado, h1 é o que aparece html */}
      <Typography variant="h3" component="h1">
        Lista de Apartamentos
      </Typography>
      {imoveis.map((imovel) => (
        <div key={imovel.id}>
          <Typography>{imovel.titulo}</Typography>
          <Typography>
            {imovel.tipo}, {imovel.tipologia}
          </Typography>
          <Typography>Estado: {imovel.estado}</Typography>
          <Typography>Descrição: {imovel.descricao}</Typography>
          {imovel.imagens ? (
            <Grid container>
              <Grid xs={12} item>
                <Typography variant="body1">Imagens:</Typography>
              </Grid>
              {imovel.imagens.map((_id) => (
                <Grid
                  sx={{ padding: 2 }}
                  style={{ maxHeight: "20vh" }}
                  textAlign="center"
                  xs={6}
                  lg={4}
                  key={_id}
                  item
                >
                  <Photo id={_id} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1">Este imóvel não tem imagens</Typography>
          )}
          <Typography>Ano: {imovel.ano}</Typography>
          <Typography>Preço: {imovel.preco} €</Typography>
          <Stack sx={{ py: 2 }} direction="row" alignItems="center" spacing={2}>
            <Button
              component={Link}
              to={"/anuncio/" + imovel.id}
              variant="contained"
              color="primary"
            >
              ABRIR ANUNCIO
            </Button>
            <Button
              component={Link}
              to={"/anuncio/editar/" + imovel.id}
              variant="contained"
              color="primary"
            >
              EDITAR ANUNCIO
            </Button>
            <Button variant="contained" onClick={() => handleClick(imovel.id)}>
              APAGAR ANUNCIO
            </Button>
          </Stack>
        </div>
      ))}
      {/* <Button variant="contained" onClick={() => getImoveisUsados()}>
        IMOVEIS USADOS
      </Button> */}
      <Button
        component={Link}
        to="/anuncio/adicionar"
        variant="contained"
        color="primary"
      >
        ADICIONAR NOVO ANUNCIO
      </Button>
    </Container>
  );
}

export default Imoveis;
