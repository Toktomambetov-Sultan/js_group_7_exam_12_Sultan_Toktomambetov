const schema = require("../Models");
const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
const config = require("../config");
const fs = require("fs").promises;
mongoose.connect(config.db.url + config.db.name, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  autoIndex: true,
});
const db = mongoose.connection;

db.once("open", async () => {
  await Promise.all(
    (await fs.readdir(config.ImageUploadingDir)).map((item) => {
      if (item === ".gitignore") return;
      fs.unlink(config.ImageUploadingDir + "/" + item);
    })
  );
  await Promise.all(
    (await fs.readdir(config.FixturesImagesDir)).map((item) =>
      fs.copyFile(
        `${config.FixturesImagesDir}/${item}`,
        `${config.ImageUploadingDir}/${item}`
      )
    )
  );
  try {
    await db.dropDatabase();
  } catch (e) {
    console.log("Collections were not present, skipping drop...");
  }
  const user = await schema.User.create({
    username: "sultan",
    password: "H1h2h3h4",
    displayName: "Sultan Toktomambetov",
    token: nanoid(),
  });
  await schema.Photo.create(
    {
      user: user._id,
      title: "day off",
      image: "1.jpeg",
    },
    {
      user: user._id,
      title: "day off",
      image: "2.jpeg",
    }
  );
  db.close();
});
