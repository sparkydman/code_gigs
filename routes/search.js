const express = require("express");

const router = express.Router();

const models = require("../models");
const Op = models.Sequelize.Op;

// Search for gigs
router.get("/", async (req, res, next) => {
  console.log(req.query);
  try {
    let { term } = req.query;
    term = term.toLowerCase();
    const gigs = await models.gig.findAll({
      where: {
        [Op.or]: [
          {
            technologies: {
              [Op.like]: "%" + term + "%",
            },
          },
          {
            title: {
              [Op.like]: "%" + term + "%",
            },
          },
        ],
      },
      raw: true,
    });
    res.render("gigs", { gigs });
  } catch (err) {
    res.render("error", { error: err.message });
  }
});

module.exports = router;
