import React, { useEffect, useState } from "react";

function Photo(props) {
  const [photo, setPhoto] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    let queryString = "/api/photos/";

    queryString += props.id;
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
    return (
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
    );
  }

  return (
    <React.Fragment>
      {photo.image ? (
        photo.image.data ? (
          props.contain === true ? (
            <img
              draggable="false"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                backgroundColor: "#252526",
              }}
              alt=""
              src={"data:" + photo.type + ";base64," + photo.image.data}
            />
          ) : (
            <img
              draggable="false"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              alt=""
              src={"data:" + photo.type + ";base64," + photo.image.data}
            />
          )
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
