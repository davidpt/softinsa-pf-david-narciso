import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Editar() {
  const params = useParams();
  const [imovel, setImovel] = useState([]);
  const [loading, setLoading] = useState(false);
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

      //console.log(queryString);
      setLoading(true);

      fetch(queryString)
        .then((response) => response.json())
        .then((data) => {
          setImovel(data);
          setLoading(false);
        });
    }
  }, [params]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setImovel({ ...imovel, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(
      "/api/imovel/" + (imovel.id ? "editar/" + imovel.id : "adicionar"),
      {
        method: imovel.id ? "PUT" : "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(imovel),
      }
    );
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
    <>
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
          <select id="tipologia" name="tipologia">
            <option value="T0">T0</option>
            <option value="T1">T1</option>
            <option value="T2">T2</option>
            <option value="T3">T3</option>
            <option value="T4">T4</option>
            <option value="T5">T5</option>
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

          <button type="submit">Guardar</button>
        </form>
      </div>
    </>
  );
}

export default Editar;
