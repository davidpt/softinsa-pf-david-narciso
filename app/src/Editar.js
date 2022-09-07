import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AddPhoto from "./AddPhoto";
import { Button, Container } from "@mui/material";

function Editar() {
  const params = useParams();
  const [imovel, setImovel] = useState([]);
  const [photoArray, setPhotoArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tipologia, setTipologia] = useState(["T0", "T1", "T2", "T3", "T4", "T5"]);
  let navigate = useNavigate();

  const initialFormState = {
    id: "",
    tipo: "",
    tipologia: "",
    categoria: "",
    estado: "",
    descricao: "",
  };

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
          if (data.tipo === "MORADIA") {
            setTipologia(["V0", "V1", "V2", "V3", "V4", "V5"]);
            console.log("tive de mudar para moradia!. Valor de tipologia: " + tipologia);
          }
          setLoading(false);
        });
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setImovel({ ...imovel, [name]: value });
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
    //TODO: implementar isto para limpar os campos?
    setImovel(initialFormState);

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
      <div key={imovel.id}>
        <p style={{ marginBottom: "0" }}>
          {imovel.tipo}, {imovel.tipologia}
        </p>
        <p style={{ margin: "0" }}>Categoria: {imovel.categoria}</p>
        <p style={{ margin: "0" }}>Estado: {imovel.estado}</p>
        <p style={{ margin: "0" }}>Descrição: {imovel.descricao}</p>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>ID imóvel</label>
          <input
            type="text"
            id="id"
            name="id"
            defaultValue={imovel.id}
            disabled
          />

          <label>Tipo</label>
          <select id="tipo" name="tipo">
            <option value="MORADIA">Moradia</option>
            <option value="APARTAMENTO">Apartamento</option>
          </select>

          <label>Tipologia</label>
          <select onChange={handleChange} id="tipologia" name="tipologia">
            {tipologia.map((_t, index) =>
              imovel.tipologia === _t ? (
                <option key={index} selected value={_t}>
                  {_t}
                </option>
              ) : (
                <option key={index} value={_t}>{_t}</option>
              )
            )}
          </select>

          <label>País</label>
          <select id="pais" name="pais">
            <option value="Portugal">Portugal</option>
            <option value="Espanha">Espanha</option>
          </select>

          <label>Distrito</label>
          <select id="distrito" name="distrito">
            <option value="Lisboa">Lisboa</option>
            <option value="Porto">Porto</option>
          </select>

          <label>Descrição</label>
          <input
            type="text"
            id="descricao"
            name="descricao"
            defaultValue={imovel.descricao}
            onChange={handleChange}
            required
          />

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
