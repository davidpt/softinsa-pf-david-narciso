import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AddPhoto from "./AddPhoto";
import {
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";

const NumberFormatPrice = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      prefix="€"
      allowNegative={false}
    />
  );
});
NumberFormatPrice.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const NumberFormatYear = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      valueIsNumericString
      allowNegative={false}
      isAllowed={(values, sourceInfo) => {
        const { value } = values;
        return value <= 2022;
      }}
    />
  );
});
NumberFormatYear.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function Editar() {
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

  const tipo = [
    {
      value: "APARTAMENTO",
      label: "Apartamento",
    },
    {
      value: "TERRENO",
      label: "Terreno",
    },
    {
      value: "MORADIA",
      label: "Moradia",
    },
  ];
  const tipologia = [
    {
      value: "T0",
      label: "T0",
    },
    {
      value: "T1",
      label: "T1",
    },
    {
      value: "T2",
      label: "T2",
    },
    {
      value: "T3",
      label: "T3",
    },
    {
      value: "T4",
      label: "T4",
    },
    {
      value: "T5",
      label: "T5",
    },
    {
      value: "T6",
      label: "T6",
    },
    {
      value: "T7",
      label: "T7",
    },
    {
      value: "T8",
      label: "T8",
    },
    {
      value: "T9",
      label: "T9",
    },
    {
      value: "T10 ou superior",
      label: "T10 ou superior",
    },
  ];
  const estado = [
    {
      value: "NOVO",
      label: "Novo",
    },
    {
      value: "USADO",
      label: "Usado",
    },
  ];
  const distrito = [
    {
      value: "VIANA DO CASTELO",
      label: "Viana do Castelo",
    },
    {
      value: "BRAGA",
      label: "Braga",
    },
    {
      value: "VILA REAL",
      label: "Vila Real",
    },
    {
      value: "BRAGANCA",
      label: "Bragança",
    },
    {
      value: "PORTO",
      label: "Porto",
    },
    {
      value: "AVEIRO",
      label: "Aveiro",
    },
    {
      value: "VISEU",
      label: "Viseu",
    },
    {
      value: "GUARDA",
      label: "Guarda",
    },
    {
      value: "COIMBRA",
      label: "Coimbra",
    },
    {
      value: "CASTELO BRANCO",
      label: "Castelo Branco",
    },
    {
      value: "LEIRIA",
      label: "Leiria",
    },
    {
      value: "SANTAREM",
      label: "Santarém",
    },
    {
      value: "LISBOA",
      label: "Lisboa",
    },
    {
      value: "PORTALEGRE",
      label: "Portalegre",
    },
    {
      value: "SETUBAL",
      label: "Setúbal",
    },
    {
      value: "EVORA",
      label: "Évora",
    },
    {
      value: "BEJA",
      label: "Beja",
    },
    {
      value: "FARO",
      label: "Faro",
    },
  ];

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

  // const titleCase = (str) => {
  //   return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
  // };

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

  const title = (
    <Typography variant="h4" component="h1">
      {imovel.id ? "Editar imóvel" : "Adicionar imóvel"}
    </Typography>
  );

  return (
    <Container id="edit" sx={{ pt: 5, pb: 2 }} maxWidth="lg">
      {title}
      <Stack
        onSubmit={handleSubmit}
        component="form"
        direction="column"
        sx={{ py: 5 }}
        spacing={4}
      >
        {imovel.id ? (
          <>
            <FormControl variant="standard">
              <InputLabel htmlFor="imoid">ID do imóvel</InputLabel>
              <Input id="imoid" value={imovel.id} disabled />
            </FormControl>
          </>
        ) : (
          <></>
        )}

        <FormControl variant="standard">
          <InputLabel htmlFor="imotitulo">Título do anúncio</InputLabel>
          <Input
            id="imotitulo"
            name="titulo"
            value={imovel.titulo}
            onChange={handleChange}
            required
          />
        </FormControl>

        <TextField
          variant="standard"
          name="tipo"
          id="imotipo"
          select
          label="Tipo de imóvel"
          value={imovel.tipo}
          onChange={handleChange}
          required
        >
          {tipo.map((_t) => (
            <MenuItem key={_t.value} value={_t.value}>
              {_t.label}
            </MenuItem>
          ))}
        </TextField>

        {imovel.tipo === "TERRENO" ? (
          <></>
        ) : (
          <>
            <TextField
              variant="standard"
              name="tipologia"
              id="imotipologia"
              select
              label="Tipologia"
              value={imovel.tipologia}
              onChange={handleChange}
              required
            >
              {tipologia.map((_t) => (
                <MenuItem key={_t.value} value={_t.value}>
                  {_t.label}
                </MenuItem>
              ))}
            </TextField>
          </>
        )}

        <TextField
          variant="standard"
          name="estado"
          id="imoestado"
          select
          label="Estado"
          value={imovel.estado}
          onChange={handleChange}
          required
        >
          {estado.map((_e) => (
            <MenuItem key={_e.value} value={_e.value}>
              {_e.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          variant="standard"
          name="distrito"
          id="imodistrito"
          select
          label="Distrito"
          value={imovel.distrito}
          onChange={handleChange}
          required
        >
          {distrito.map((_d) => (
            <MenuItem key={_d.value} value={_d.value}>
              {_d.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Ano"
          value={imovel.ano}
          onChange={handleChange}
          name="ano"
          id="imoano"
          InputProps={{
            inputComponent: NumberFormatYear,
          }}
          variant="standard"
          required
        />

        <TextField
          label="Preço"
          value={imovel.preco}
          onChange={handleChange}
          name="preco"
          id="imopreco"
          InputProps={{
            inputComponent: NumberFormatPrice,
          }}
          variant="standard"
          required
        />

        <TextField
          id="imodescricao"
          name="descricao"
          label="Descrição"
          multiline
          maxRows={20}
          defaultValue={imovel.descricao}
          onChange={handleChange}
          variant="standard"
          required
        />

        <AddPhoto photoArray={photoArray} setPhotoArray={setPhotoArray} />

        <Button type="submit" variant="contained">
          Guardar
        </Button>
      </Stack>
    </Container>
  );
}
