const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;

function validateNote(note) {
  const schema = {
    title: Joi.string()
      .trim()
      .min(5)
      .required(),
    content: Joi.string()
      .trim()
      .min(5)
      .required()
  };

  return Joi.validate(note, schema);
}

const noteSchema = new Schema({
  title: {
    type: String,
    minlength: 5,
    required: true,
    trim: true
  },
  content: {
    type: String,
    minlength: 5,
    required: true,
    trim: true
  }
});

const Note = mongoose.model('Note', noteSchema);

module.exports.validateNote = validateNote;
module.exports.Note = Note;
