const express = require("express");
const app = express();
const PORT = 3004;

app.use(express.json());

let notes = [
  {
    userId: 1,
    id: 1,
    title: "Meditar",
    date: "21/12/2022",
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: "Study english",
    date: "23/12/2022",
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: "Study React + TypeScript",
    date: "28/12/2022",
    completed: false,
  }
];

// GET
app.get("/", (req, res) => {
  res.send("<h2>Welcome</h2>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  note
    ? res.json(note)
    : res.status(404).json({ message: "Note not found" }).end();
});


// DELETE
app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  res.status(204).json({ message: "Note deleted successfully" }).end();
})


// POST
app.post('/api/notes/create-note', (req, res) => {
  const note = req.body
  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    userId: 1,
    id: maxId + 1,
    title: note.title,
    date: new Date().toISOString(),
    completed: note.completed || false
  }

  notes = [...notes, newNote]
  res.status(201).json({ message: "Note created with exit"})
})


// UPDATE 
app.post('/api/notes/update-note', (req, res) => {
  const noteToUpdated = req.body
  notes = notes.map(
    note => note.id == noteToUpdated.id
      ? {...note, ...noteToUpdated}
      : {...note}
  )
  res.json({
    message: "Note updated",
  }).end()
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
