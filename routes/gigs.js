const express = require("express");

const router = express.Router();

const models = require("../models");

//Get all gigs
router.get("/", async (req, res, next) => {
  try {
    const gigs = await models.gig.findAll({ raw: true });
    res.render("gigs", {
      gigs,
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a gig
router.get("/:id", async (req, res, next) => {
  try {
    const gig = await models.gig.findOne({
      where: { id: req.params.id },
      raw: true,
    });
    res.json({
      success: true,
      data: gig,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
    });
  }
});

//Update a gig
router.put("/:id", async (req, res, next) => {
  try {
    await models.gig.update({ ...req.body }, { where: { id: req.params.id } });
    res.json({
      success: true,
      msg: "Gig updated successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
    });
  }
});

//Delete a gig
router.delete("/:id", async (req, res, next) => {
  try {
    await models.gig.destroy({ where: { id: req.params.id } });
    res.json({
      success: true,
      msg: "Gig deleted successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
    });
  }
});

//Search for gigs
// router.get("/search", async (req, res, next) => {
//     console.log(term);
//   try {
//     let { term } = req.query;
//     term = term.toLowerCase();
//     const gigs = await models.gig.findAll({
//       where: {
//         [Op.or]: [
//           {
//             technologies: {
//               [Op.like]: "%" + term + "%",
//             },
//           },
//           {
//             title: {
//               [Op.like]: "%" + term + "%",
//             },
//           },
//         ],
//       },
//     });
//     res.render("gigs", { gigs });
//   } catch (err) {
//     res.render("error", { error: err.message });
//   }
// });

module.exports = router;
