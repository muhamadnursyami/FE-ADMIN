import { useState } from "react";
import axios from "axios";

export default function CreateArtikel() {
  const [title, setTitle] = useState("");
  const [penulis, setPenulis] = useState("");
  const [tahun, setTahun] = useState("");
  const [img, setImg] = useState("");
  const [content, setContent] = useState([""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddContentField = () => {
    setContent([...content, ""]);
  };

  const handleContentChange = (index, value) => {
    const newContent = [...content];
    newContent[index] = value;
    setContent(newContent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newArtikel = { title, penulis, tahun, img, content };
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "https://high-pearle-istudent-e72a78db.koyeb.app/artikel",
        newArtikel
      );
      console.log("Artikel created successfully:", response.data);
      setTitle("");
      setPenulis("");
      setTahun("");
      setImg("");
      setContent([""]);
    } catch (error) {
      console.error("Error creating artikel:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border-2 border-gray-200 shadow-md rounded-lg dark:border-gray-700 mt-14"
    >
      <h1 className="text-2xl font-bold mb-3">Create Artikel</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-1"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Penulis</label>
        <input
          type="text"
          value={penulis}
          onChange={(e) => setPenulis(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-1"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Tahun</label>
        <input
          type="text"
          value={tahun}
          onChange={(e) => setTahun(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-1"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Image URL</label>
        <input
          type="text"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-1"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Content</label>
        {content.map((artikel, index) => (
          <div key={index} className="mb-2">
            <textarea
              value={artikel}
              onChange={(e) => handleContentChange(index, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddContentField}
          className="text-blue-700 hover:text-blue-800"
        >
          + Add another content field
        </button>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
