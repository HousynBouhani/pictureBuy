const express = require("express");
const router = express.Router();

const Image = require("../models/Image");
const User = require("../models/User");

// @route  GET api/images
// @desc to GET all images in home page

router.get("/", async (request, response) => {
  try {
    const images = await Image.find().sort({
      date: -1,
    });
    response.json(images);
  } catch (error) {
    console.error(error.message);
    response.status(500).send("server error");
  }
});

// @route  GET api/images
// @desc to GET a single a image for purshase
router.get("/:id", async (request, response) => {
  try {
    const image = await Image.findById(request.params.id);
    response.json(image);
  } catch (error) {
    console.error(error.message);
    response.status(500).send("server error");
  }
});

// @route  post api/images
// @desc to buy an image
router.post("/:idUser/:idImg", async (request, response) => {
  try {
    /* use the params in request too find if the user already bought the image*/
    const queryy = {
      _id: request.params.idUser,
      imageBought: { image: request.params.idImg },
    };

    const Imagesold = await User.findOne(queryy).select("-password");

    /* if we get a result means there is a image so the user is doing a second purshase*/
    if (Imagesold !== null) {
      return response.json({ secondPurshase: true });
    }

    /*procced to add image to the list of purshased images by the user if not purshased before*/
    const query = { _id: request.params.idUser };
    const update = {
      $push: { imageBought: { image: request.params.idImg } },
    };
    const imagePurshased = await User.updateOne(query, update);
    response.json({ msg: "success" });
  } catch (error) {
    console.error(error.message);
    response.status(500).send("server error");
  }
});

module.exports = router;
