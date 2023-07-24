const commentRouter = require("express").Router();
const { response } = require("express");
const Comment = require("../models/comments");
const Blog = require("../models/blog");

commentRouter.get("/:id/comments", async (request, response, next) => {
  const blogId = request.params.id;
  try {
    const returnedComment = await Comment.find({ blog: blogId }).populate(
      "blog",
      {
        title: 1,
        author: 1,
      }
    );
    if (returnedComment !== null) {
      // allaoleva kutsuu automaattisesti toJson -metodia muodostaessaan vastausta
      response.json(returnedComment);
      console.log(returnedComment);
    } else {
      response.status(404).end();
    }
    //käyttää virheiden käsittelijä-middlewarea, ns. keskitetty virheiden käsittely
  } catch (exception) {
    next(exception);
  }
});

commentRouter.post("/:id/comments", async (request, response, next) => {
  const body = request.body;
  const blogId = request.params.id;

  //parametrien perusteella modelin avulla luodaan JavScript -objekti
  const comment = new Comment({
    content: body.content,
    blog: blogId,
  });

  //tallentaminen tietokantaan
  try {
    const savedComment = await comment.save();
    response.status(201).json(savedComment);
  } catch (exception) {
    next(exception);
  }
});

module.exports = commentRouter;
