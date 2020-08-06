const express = require("express");

const router = express.Router();

const models = require("../models");

//Render form
router.get("/", (req, res) => res.render("add"));

//Create a gig
router.post("/", async (req, res, next) => {
  let { title, technologies, budget, description, email } = req.body;
  let error = [];
  if (!title) {
    error.push({ text: "Title is required" });
  }
  if (!technologies) {
    error.push({ text: "Technologies is required" });
  }
  if (!description) {
    error.push({ text: "Description is required" });
  }
  if (!email) {
    error.push({ text: "Contact email is required" });
  }
  if (error.length > 0) {
    res.render("add", {
      error,
      title,
      technologies,
      budget,
      description,
      email,
    });
  } else {
    if (!budget) {
      budget = "Unknow";
    } else {
      budget = `NGN${budget}`;
    }

    technologies = technologies.toLowerCase().replace(/,[ ]+/g, ",");

    console.log("am here now");
    models.gig
      .create({ title, technologies, budget, description, email })
      .then(() => res.redirect("/gigs"))
      .catch((err) => res.render("error", { error: err.message }));
  }
});

module.exports = router;
