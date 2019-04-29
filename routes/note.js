const express = require('express');
const noteController = require('../controllers/note');
const validateObjectId = require('../middleware/validateObjectId');
const router = express.Router();

router.get('/', noteController.fetchNotes);
router.post('/', noteController.addNote);
router.get('/:id', validateObjectId, noteController.fetchNote);
router.put('/:id', validateObjectId, noteController.updateNote);
router.delete('/:id', validateObjectId, noteController.deleteNote);

module.exports = router;
