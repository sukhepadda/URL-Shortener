const express = require("express");
const { connectToMongoDB } = require("./connection");
const urlRoute = require("./routes/url");
const URL = require("./models/urls").URL;

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/urlShortner").then(() =>
  console.log("Database Connected")
);

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  console.log(shortId);
  const entry = await URL.findOneAndUpdate(
    { 
        shortId 
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at ${PORT}`));
