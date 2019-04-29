const { validateNote, Note } = require('../models/note');

exports.fetchNotes = async function(req, res) {
  try {
    let notes = await Note.find();
    res.send(notes);
  } catch (err) {
    res.status(500).send('Something went wrong...');
  }
};

exports.addNote = async function(req, res) {
  const { error } = validateNote(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const { title, content } = req.body;
    let note = await Note.create({ title, content });
    res.send(note);
  } catch (err) {
    res.status(500).send('Something went wrong...');
  }
};

exports.fetchNote = async function(req, res) {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send('Note with the given ID is not found');
    }

    res.send(note);
  } catch (err) {
    res.status(500).send('Something went wrong...');
  }
};

exports.updateNote = async function(req, res) {
  const { error } = validateNote(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const { title, content } = req.body;
    let foundNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
    if (!foundNote) {
      return res.status(404).send('Note with the given ID is not found');
    }
    res.send(foundNote);
  } catch (err) {
    res.status(500).send('Something went wrong...');
  }
};

exports.deleteNote = async function(req, res) {
  try {
    let foundNote = await Note.findByIdAndRemove(req.params.id);
    if (!foundNote) {
      return res.status(404).send('Note with the given ID is not found');
    }
    res.send(foundNote);
  } catch (err) {
    res.status(500).send('Something went wrong...');
  }
};
