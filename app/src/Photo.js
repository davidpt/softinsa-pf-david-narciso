import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import NotFound from "./NotFound";

function Photo(props) {
  const params = useParams();
  const [photo, setPhoto] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    let queryString = "/api/photos/";

    if (params.id != null) {
      queryString += params.id;
    } else {
      queryString += props.id;
    }

    //console.log(queryString);
    setLoading(true);

    fetch(queryString)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setPhoto(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });

    //eslint-disable-next-line
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <NotFound />;
  }

  return (
    <React.Fragment>
      {photo.image ? (
        photo.image.data ? (
          <img
            style={{ borderRadius:"5%", height:"100%", width: "100%", objectFit:"cover" }}
            alt=""
            src={"data:" + photo.type + ";base64," + photo.image.data}
          />
        ) : (
          "No content on photo.image.data"
        )
      ) : (
        "No content on photo.image"
      )}
    </React.Fragment>
  );
}

export default Photo;
