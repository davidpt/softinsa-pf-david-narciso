import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AddPhoto from "./AddPhoto";
import { Button, Container } from "@mui/material";

function Editar() {
  const initialState = {
    tipo: "APARTAMENTO",
    estado: "USADO",
    tipologia: "T0",
    distrito: "VIANA DO CASTELO",
  };

  const params = useParams();
  const [imovel, setImovel] = useState(initialState);
  const [photoArray, setPhotoArray] = useState([]);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const [tipo] = useState(["APARTAMENTO", "MORADIA", "TERRENO"]);
  const [estado] = useState(["USADO", "NOVO"]);
  const [tipologia] = useState([
    "T0",
    "T1",
    "T2",
    "T3",
    "T4",
    "T5",
    "T6",
    "T7",
    "T8",
    "T9",
    "T10 ou superior",
  ]);
  const [distrito] = useState([
    "VIANA DO CASTELO",
    "BRAGA",
    "VILA REAL",
    "BRAGANCA",
    "PORTO",
    "AVEIRO",
    "VISEU",
    "GUARDA",
    "COIMBRA",
    "CASTELO BRANCO",
    "LEIRIA",
    "SANTAREM",
    "LISBOA",
    "PORTALEGRE",
    "SETUBAL",
    "EVORA",
    "BEJA",
    "FARO",
  ]);

  useEffect(() => {
    if (params.id != null) {
      let queryString = "/api/imovel/" + params.id;
      setLoading(true);

      fetch(queryString)
        .then((response) => response.json())
        .then((data) => {
          setImovel(data);
          if (data.imagens != null) {
            setPhotoArray(data.imagens);
          }
          setLoading(false);
        });
    }
    // eslint-disable-next-line
  }, []);

  const titleCase = (str) => {
    return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setImovel({ ...imovel, [name]: value });

    if (value === "TERRENO") {
      setImovel((current) => {
        // if tipo == terreno then remove tipologia from imovel
        const { tipologia, ...rest } = current;
        return rest;
      });
    }

    console.log(JSON.stringify(imovel));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //Adicionar ao nosso objeto o array com os IDs das imagens
    imovel.imagens = photoArray;

    await fetch("/api/imovel/" + (imovel.id ? "edit/" + imovel.id : "add"), {
      method: imovel.id ? "PUT" : "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(imovel),
    });

    //Posso redirecionar ou posso dar apenas uma notificação a dizer que o imóvel foi adicionado/editado
    navigate("/imoveis");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const title = <h2>{imovel.id ? "Editar imóvel" : "Adicionar imóvel"}</h2>;

  return (
    <Container id="edit" sx={{ pt: 1, pb: 5 }} maxWidth="lg">
      {title}
      <div>
        <form onSubmit={handleSubmit}>
          {imovel.id ? (
            <>
              <label>ID imóvel</label>
              <input
                type="text"
                id="id"
                name="id"
                defaultValue={imovel.id}
                disabled
              />
            </>
          ) : (
            <></>
          )}

          <label>Título</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            defaultValue={imovel.titulo}
            onChange={handleChange}
            required
          />

          <label>Tipo</label>
          <select onChange={handleChange} id="tipo" name="tipo">
            {tipo.map((_t, index) =>
              imovel.tipo === _t ? (
                <option key={index} selected value={_t}>
                  {titleCase(_t)}
                </option>
              ) : (
                <option key={index} value={_t}>
                  {titleCase(_t)}
                </option>
              )
            )}
          </select>

          {imovel.tipo === "TERRENO" ? (
            <></>
          ) : (
            <>
              <label>Tipologia</label>
              <select onChange={handleChange} id="tipologia" name="tipologia">
                {tipologia.map((_t, index) =>
                  imovel.tipologia === _t ? (
                    <option key={index} selected value={_t}>
                      {titleCase(_t)}
                    </option>
                  ) : (
                    <option key={index} value={_t}>
                      {titleCase(_t)}
                    </option>
                  )
                )}
              </select>
            </>
          )}

          <label>Estado</label>
          <select onChange={handleChange} id="estado" name="estado">
            {estado.map((_e, index) =>
              imovel.estado === _e ? (
                <option key={index} selected value={_e}>
                  {titleCase(_e)}
                </option>
              ) : (
                <option key={index} value={_e}>
                  {titleCase(_e)}
                </option>
              )
            )}
          </select>

          <label>Distrito</label>
          <select onChange={handleChange} id="distrito" name="distrito">
            {distrito.map((_d, index) =>
              imovel.distrito === _d ? (
                <option key={index} selected value={_d}>
                  {titleCase(_d)}
                </option>
              ) : (
                <option key={index} value={_d}>
                  {titleCase(_d)}
                </option>
              )
            )}
          </select>

          <label>Ano</label>
          <input
            type="number"
            id="ano"
            name="ano"
            min="1900"
            max="2022"
            defaultValue={imovel.ano}
            onChange={handleChange}
            required
          />

          <label>Preço</label>
          <input
            type="number"
            id="preco"
            name="preco"
            min="0"
            defaultValue={imovel.preco}
            onChange={handleChange}
            required
          />

          <p></p>
          <label>Descrição</label>
          <p></p>
          <textarea
            id="descricao"
            name="descricao"
            defaultValue={imovel.descricao}
            onChange={handleChange}
            required
            cols="40"
            rows="5"
          ></textarea>
          <p></p>

          <Button type="submit" variant="contained">
            Guardar
          </Button>
        </form>
        <AddPhoto photoArray={photoArray} setPhotoArray={setPhotoArray} />
      </div>
    </Container>
  );
}

export default Editar;
