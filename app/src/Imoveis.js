import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Imoveis() {
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  //Lida com a snackbar
  const [open, setOpen] = React.useState(false);
  const handleClick = (id) => {
    setOpen(true);
    remove(id);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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
    await fetch(`/api/imovel/apagar/${id}`, {
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

  function getImoveisUsados() {
    searchParams.set("estado", "usado");
    setSearchParams(searchParams);
  }

  if (loading) {
    return (
      <div className="App-header">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <React.Fragment>
      {/* Variant é o estilo aplicado, h1 é o que aparece html */}
      <Typography variant="h3" component="h1">
        Lista de Apartamentos
      </Typography>
      {imoveis.map((imovel) => (
        <div key={imovel.id}>
          <Typography>
            {imovel.tipo}, {imovel.tipologia}
          </Typography>
          <Typography>Categoria: {imovel.categoria}</Typography>
          <Typography>Estado: {imovel.estado}</Typography>
          <Typography>Categoria: Descrição: {imovel.descricao}</Typography>
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
        </div>
      ))}
      <Button variant="contained" onClick={() => getImoveisUsados()}>
        IMOVEIS USADOS
      </Button>
      <Button
        component={Link}
        to="/anuncio/adicionar"
        variant="contained"
        color="primary"
      >
        ADICIONAR NOVO ANUNCIO
      </Button>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Imóvel apagado com sucesso!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export default Imoveis;
