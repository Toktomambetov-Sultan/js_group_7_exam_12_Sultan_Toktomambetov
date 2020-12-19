const mongoose = require("mongoose");
const unpublicUser = require("../tools/models/unpublicUser");
const fs = require("fs").promises;
const config = require("../config");
const Schema = mongoose.Schema;

const Photo = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
Photo.post("findOneAndDelete", async function (doc, next) {
  doc.image && (await fs.unlink(config.ImageUploadingDir + "/" + doc.image));
  next();
});

Photo.post("find", async function (docs, next) {
  for (let doc of docs) {
    await unpublicUser(doc);
  }
  next();
});

module.exports = Photo;
