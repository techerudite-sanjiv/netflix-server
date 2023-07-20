const Movies = require("../models/Movies");

import formidable, { errors as formidableErrors } from "formidable";

module.exports = {
  // User registration api
  registerMovies: async (req, res) => {
    const { title, description, gener, duration, image } = req.body;
    // const form = formidable({});
    // let fields;
    // let files;
    // [fields, files] = await form.parse(req);

    if (title && description && gener && duration && image) {
      await Movies.create({
        title: title,
        description: description,
        gener: gener,
        duration: duration,
        image: image,
      });

      return res.json({
        status: "success",
        message: "Movies register successfully",
      });
    } else {
      return res.json({
        status: "failed",
        message: "All fields are compalsary",
      });
    }
  },
};
