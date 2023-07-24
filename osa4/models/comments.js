const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

//kertoo miten muistiinpano tulee tallentaa tietokantaan

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
});

//muokataan Mongoosen palauttamat oliot haluttuun muotoon
//-v -muuttujat poistetaan ja _id -muuttujasta tehdään 'id' -muuttuja
commentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

commentSchema.plugin(uniqueValidator);

//määrittelee että Mongoose tallentaa kommenttioliot kokoelmaan 'comments'
module.exports = mongoose.model("Comment", commentSchema);
