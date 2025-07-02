import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";

import api from '../lib/axios';
import Navbar from '../components/Navbar.jsx';

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`notes/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.error("Failed to fetch note.")
        console.error("Error fetching note.", error.response.data.message);
      } finally {
        setLoading(false);
      }
    }
    fetchNote();
  }, [id])

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    try {
      const res = await api.delete(`/notes/${note._id}`);
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete note.");
      console.log("Error deleting note.", error);
    }
  }

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please enter all fields.");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/notes/${note._id}`, note);
      toast.success("Note updated successfully.");
      navigate("/");
    } catch (error) {
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating notes too fast.", {
          duration: 4000,
          icon: "💀",
        })
      }
      console.error("Error saving note", error.response.data.message);
      toast.error("Failed to save note.");
    } finally {
      setSaving(false);
    }

  }


  return (
    <div>
      <Navbar />
      {loading && (<div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>)}

      {!loading && (
        <div className="min-h-screen bg-base-200">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <Link to={"/"} className="btn btn-ghost mb-6">
                  <ArrowLeftIcon />
                  Back to Notes
                </Link>
                <button onClick={handleDelete} className="btn btn-error btn-outline">
                  <Trash2Icon className="h-5 w-5" />
                  Delete Note
                </button>
              </div>
              <div className="card bg-base-100">
                <div className="card-body">
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Title</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Note title"
                      className="input input-bordered"
                      value={note.title}
                      onChange={(e) => { setNote({ ...note, title: e.target.value }) }}
                    />
                  </div>

                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Content</span>
                    </label>
                    <textarea
                      type="text"
                      placeholder="Write your note here..."
                      className="textarea textarea-bordered h-32"
                      value={note.content}
                      onChange={(e) => { setNote({ ...note, content: e.target.value }) }}
                    />
                  </div>

                  <div className="card-actions justify-end">
                    <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NoteDetailPage
