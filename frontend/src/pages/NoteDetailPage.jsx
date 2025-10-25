import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams, Link } from "react-router";
import api from "../lib/axios.js";

const NoteDetailPage = () => {
  const [note, setNote] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch note data saat pertama kali render
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note:", error);
        toast.error("Gagal mengambil catatan");
      } finally {
        setLoading(false);
      }
    };
    console.log("🔎 ID dari URL:", id);
    fetchNote();
  }, [id]);

  // Fungsi untuk menghapus note
  const handleDelete = async () => {
    if (!window.confirm("Apakah anda yakin ingin menghapus catatan ini?"))
      return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Catatan berhasil dihapus");
      navigate("/");
    } catch (error) {
      console.log("Error saat menghapus catatan:", error);
      toast.error("Gagal menghapus catatan");
    }
  };

  // Fungsi untuk menyimpan (update) perubahan note
  const handleSave = async () => {
    if(!note.title.trim() || !note.content.trim()){
      toast.error("Please add a title or content");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Perubahan berhasil disimpan");
      navigate('/')
    } catch (error) {
      console.log("Error saat menyimpan catatan:", error);
      toast.error("Gagal menyimpan perubahan");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <p>Catatan tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost flex items-center gap-2">
              <ArrowLeftIcon className="h-5 w-5" />
              Kembali ke Catatan
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" />
              Hapus Catatan
            </button>
          </div>

          {/* Note Form */}
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Judul</span>
                </label>
                <input
                  type="text"
                  placeholder="Judul catatan"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Isi Catatan</span>
                </label>
                <textarea
                  placeholder="Tulis catatan kamu di sini..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>

              {/* Save Button */}
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? (
                    <>
                      <LoaderIcon className="animate-spin w-4 h-4 mr-2" />
                      Menyimpan...
                    </>
                  ) : (
                    "Simpan Perubahan"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
