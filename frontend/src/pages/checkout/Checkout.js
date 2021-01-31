import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

/* import auth context */

import AuthContext from "../../context/auth/authContext";

const Checkout = (props) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user } = authContext;

  const [image, setimage] = useState(null);
  const [blurred, setBlurred] = useState("blurr");
  const [sold, setSold] = useState(false);

  //get image id from params
  const imageId = props.match.params.id;
  const userId = user != null && user._id;

  useEffect(() => {
    getImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.history, sold]);

  const getImage = async () => {
    try {
      const res = await axios.get(`/api/images/${imageId}`);
      setimage(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const displayImg = () => {
    if (image === null) {
      return <p>...Loading</p>;
    }
    const { url, name } = image;

    return (
      <div className="container mt-5 d-flex justify-content-center">
        <div className="card" style={{ width: "18rem" }}>
          {<img src={url} className={blurred} alt="card" />}
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            {isAuthenticated && !sold ? (
              <div>
                <button className="btn btn-primary mr-2" onClick={buyImage}>
                  Buy
                </button>
              </div>
            ) : isAuthenticated && sold ? (
              <p>you can only buy an image once</p>
            ) : (
              <div>
                <Link to="/login">
                  <button className="btn btn-success w-100">
                    connect to buy images
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const buyImage = async () => {
    try {
      const res = await axios.post(`/api/images/${userId}/${imageId}`);
      if (!res.data.secondPurshase) {
        setBlurred("unblurr");
      } else {
        setSold(true);
        setBlurred("blurr");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <div>{displayImg()}</div>;
};

export default Checkout;
