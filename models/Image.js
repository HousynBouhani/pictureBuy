const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
  url:{
    type:String
  },
  name: {
    type: String
  },
});

module.exports  = mongoose.model("image", ImageSchema);
