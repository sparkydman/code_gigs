const express = require("express");
const models = require("./models");
const path = require("path");
const cors = require("cors");
const exhndbr = require("express-handlebars");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors("*"));

app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exhndbr({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.render("index", { layout: "landing" }));

app.use("/gigs", require("./routes/gigs"));
app.use("/add", require("./routes/add"));
app.use("/search", require("./routes/search"));

models.sequelize.sync({}).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
