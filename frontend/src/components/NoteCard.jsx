import React from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router';
import { PenSquareIcon, Trash2Icon } from 'lucide-react';

import { formatDate } from '../lib/utils';
import api from '../lib/axios.js';

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!confirm("Are you sure you want to delete this note?")) return;

    console.log(`delete ${note._id}`);
    try {
      const res = await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter(note => note._id !== id)); // remove the deleted note from the list
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error deleting note.", error.reponse.data.message);
      toast.error("Failed to delete note.");
    }
  }

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#4c63ad]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">{formatDate(new Date(note.createdAt))}</span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button className="btn btn-ghost btn-xs text-error" onClick={(e) => { handleDelete(e, note._id) }}>
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NoteCard
