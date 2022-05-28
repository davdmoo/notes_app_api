const router = require("express").Router();
const Note = require("../controllers/note");

router.get("/notes", Note.getNotes);
router.post("/notes", Note.createNote);

router.get("/notes/:id", Note.getNoteById);
router.put("/notes/:id", Note.updateNote);
router.delete("/notes/:id", Note.deleteNote);

module.exports = router;
