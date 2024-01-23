import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';

const App = () => {

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', tagline: '', body: '', isPinned: false });
  const [editingNote, setEditingNote] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); //number of notes per page

  const BASE_URL = "https://note-keeping-tau.vercel.app";

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/notes`);
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
        toast.error('Error fetching notes');
      }
    };

    fetchNotes();
  }, []);

  const addNote = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/notes/create`, newNote);
      setNotes([...notes, response.data]);
      setNewNote({ title: '', tagline: '', body: '', isPinned: false });
      toast.success('Note added successfully');
    } catch (error) {
      console.error('Error adding note:', error);
      toast.error('Error adding note');
    }
  };

  const updateNote = async () => {
    try {
      const response = await axios.put(`${BASE_URL}/api/notes/${notes[editingNote]._id}`, newNote);
      const updatedNotes = [...notes];
      updatedNotes[editingNote] = response.data;
      setNotes(updatedNotes);
      setNewNote({ title: '', tagline: '', body: '', isPinned: false });
      setEditingNote(null);
      toast.success('Note updated successfully');
    } catch (error) {
      console.error('Error updating note:', error);
      toast.error('Error updating note');
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/notes/${notes[id]._id}`);
      const updatedNotes = [...notes];
      updatedNotes.splice(id, 1);
      setNotes(updatedNotes);
      toast.success('Note deleted successfully');
    } catch (error) {
      console.error('Error deleting note:', error);
      toast.error('Error deleting note');
    }
  };

  const editNote = (index) => {
    setEditingNote(index);
    setNewNote({
      title: notes[index].title,
      tagline: notes[index].tagline,
      body: notes[index].body,
      isPinned: notes[index].isPinned,
    });
  };

  const togglePin = async (index) => {
    try {
      const updatedNote = { ...notes[index], isPinned: !notes[index].isPinned };
      const response = await axios.put(`${BASE_URL}/api/notes/${notes[index]._id}`, updatedNote);

      const updatedNotes = [...notes];
      updatedNotes[index] = response.data;

      setNotes(updatedNotes);

      // Show toast notification based on the pin status
      const toastMessage = updatedNote.isPinned ? 'Note pinned successfully' : 'Note unpinned successfully';
      toast.success(toastMessage);
    } catch (error) {
      console.error('Error toggling pin:', error);
      toast.error('Error toggling pin');
    }
  };



  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNotes = notes.slice(indexOfFirstItem, indexOfLastItem);



  return (
    <div className="App flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      <h1 className="text-4xl font-bold mb-8 text-blue-600">Notekeeper</h1>

      <div className="note-form mb-8 w-96 bg-white p-4 rounded shadow-md">
        <input
          className="mb-2 w-full p-2 border rounded"
          type="text"
          placeholder="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <input
          className="mb-2 w-full p-2 border rounded"
          type="text"
          placeholder="Tagline"
          value={newNote.tagline}
          onChange={(e) => setNewNote({ ...newNote, tagline: e.target.value })}
        />
        <textarea
          className="mb-2 w-full p-2 border rounded"
          placeholder="Body"
          value={newNote.body}
          onChange={(e) => setNewNote({ ...newNote, body: e.target.value })}
        />
        {editingNote !== null ? (
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={updateNote}>
            Update Note
          </button>
        ) : (
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={addNote}>
            Add Note
          </button>
        )}
      </div>

      <div className="note-grid grid gap-4 w-full max-w-4xl">
        {currentNotes.map((note, index) => (
          <div
            key={index}
            className={`note p-4 border rounded ${note.isPinned ? 'bg-yellow-100' : 'bg-white'}`}
          >
            <h3 className="text-xl font-bold mb-2">{note.title}</h3>
            {note.tagline && <p className="text-gray-500 mb-2">{note.tagline}</p>}
            {note.body && <p>{note.body}</p>}
            <div className="mt-2">
              <button className="mr-2 text-blue-500" onClick={() => editNote(index)}>
                Edit
              </button>
              <button className="mr-2 text-red-500" onClick={() => deleteNote(index)}>
                Delete
              </button>
              <button className="text-yellow-500" onClick={() => togglePin(index)}>
                {note.isPinned ? 'Unpin' : 'Pin'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination buttons */}
      <div className="pagination mt-4">
        {Array.from({ length: Math.ceil(notes.length / itemsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            className={`mr-2 ${currentPage === index + 1 ? 'font-bold' : ''}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

    </div>
  );
};

export default App;
