import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"; // match this to whatever port your backend logs
  const notesInitial = [];
  const [notes, setnotes] = useState(notesInitial);

  // Get all Notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNmFhYTI1YWJlNzhiNGU0OTYwZjUyOWIwIn0sImlhdCI6MTc4OTU1NTgyNH0.QSkS_iwbNE6lUrYzGS32Quv1GF3SNOgZVUrIzOQS84w",
      },
    });
    const json = await response.json();
    console.log(json);
    setnotes(json);
  };

  // Add a Note
  const addnote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNmFhYTI1YWJlNzhiNGU0OTYwZjUyOWIwIn0sImlhdCI6MTc4OTU1NTgyNH0.QSkS_iwbNE6lUrYzGS32Quv1GF3SNOgZVUrIzOQS84w",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setnotes(notes.concat(note));
  };

  // Delete a Note
  const deletenote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNmFhYTI1YWJlNzhiNGU0OTYwZjUyOWIwIn0sImlhdCI6MTc4OTU1NTgyNH0.QSkS_iwbNE6lUrYzGS32Quv1GF3SNOgZVUrIzOQS84w",
      },
    });

    const json = await response.json();
    console.log(response.status, json);

    if (!response.ok) return; // server refused, so keep the note in the UI

    setnotes((prev) => prev.filter((note) => note._id !== id));
  };

  // Edit a Note
  const editnote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNmFhYTI1YWJlNzhiNGU0OTYwZjUyOWIwIn0sImlhdCI6MTc4OTU1NTgyNH0.QSkS_iwbNE6lUrYzGS32Quv1GF3SNOgZVUrIzOQS84w",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    const newnotes = notes.map((note) =>
      note._id === id ? { ...note, title, description, tag } : note,
    );
    setnotes(newnotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addnote, deletenote, editnote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
