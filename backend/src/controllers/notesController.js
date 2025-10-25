import { json } from "express";
import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({createAt:-1}); //newest first
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in GetAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNoteById(req, res) {
  try { 
    const note = await Note.findById(req.params.id)
    if(!note) return res.status(404).json({message : "Note not found"})
    res.json(note)
  } catch (error) {
    console.error("Error in getNoteById controller", error);
    res.status(500).json({message : "Internal server error"})

    
  }
}


export async function createNotes(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });

    const savedNotes = await note.save();

    res.status(201).json(savedNotes);
  } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}




export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updateNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updateNote) return res.status(404).json({ message: "Note Not Found" });
    res.status(200).json(updateNote);
  } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function deleteNote(req, res) {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id)
    if(!deleteNote) return res.status(404).json({message : "Note not found"})
    res.status(200).json({message : "Note deleted succesfully!"})
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    res.status(500).json({message: "Internal server error"})
    
  }
}
