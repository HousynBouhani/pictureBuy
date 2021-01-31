import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = (props) => {
  const [imageGallery, setimageGallery] = useState(null);

  // get all images to display them to user
  const getImages = async () => {
    try {
      const res = await axios.get("/api/images");
      setimageGallery(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getImages();
  }, [props.history]);

  return (
    <>
      <div className="container mt-5">
        <div className="jumbotron">
          <h1>Image Gallery</h1>
        </div>

        <div className="row">
          {imageGallery === null ? (
            <p>loading ...</p>
          ) : (
            imageGallery.map((image) => {
              return (
                <div className="col-sm-6 col-md-4 mb-3" key={image._id}>
                  <Link to={`/buy/${image._id}`}>
                    <img
                      src={image.url}
                      alt="gallery"
                      className="fluid img-thumbnail blurr"
                    />
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
