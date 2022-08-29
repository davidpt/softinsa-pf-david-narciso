import "./App.css";
import logo from "./logo.svg";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Editar() {
  const params = useParams();
  const [imovel, setImovel] = useState([]);
  const [loading, setLoading] = useState(false);
  const [descricao, setDescricao] = useState();
  const [ano, setAno] = useState();

  useEffect(() => {
    let queryString = "/api/imovel/" + params.id;

    //console.log(queryString);

    setLoading(true);

    fetch(queryString)
      .then((response) => response.json())
      .then((data) => {
        setImovel(data);
        setDescricao(data.descricao);
        setAno(data.ano);

        setLoading(false);
      });
  }, [params]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-intro">
          <div key={imovel.id}>
            <p style={{ marginBottom: "0" }}>
              {imovel.tipo}, {imovel.tipologia}
            </p>
            <p style={{ margin: "0" }}>Categoria: {imovel.categoria}</p>
            <p style={{ margin: "0" }}>Estado: {imovel.estado}</p>
            <p style={{ margin: "0" }}>Descrição: {imovel.descricao}</p>
          </div>
          <div>
            <form action="/index.html" method="post">
              <label>ID imóvel</label>
              <input type="text" id="id" name="id" value={imovel.id} disabled />

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
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              />

              <label>Ano</label>
              <input
                type="number"
                id="ano"
                name="ano"
                min="1900"
                max="2022"
                value={ano}
                onChange={(e) => setAno(e.target.value)}
                required
              />

              <button type="submit">Guardar</button>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Editar;
