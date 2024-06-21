import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ArtikelContent() {
  const [artikel, setArtikel] = useState([]);
  const navigate = useNavigate();

  const fetchDataArtikel = async () => {
    try {
      const response = await axios.get(
        "https://high-pearle-istudent-e72a78db.koyeb.app/artikel"
      );
      setArtikel(response.data.allArtikel);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataArtikel();
  }, []);

  const handleEdit = (id) => {
    navigate(`edit/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this article?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `https://high-pearle-istudent-e72a78db.koyeb.app/artikel/${id}`
        );
        setArtikel(artikel.filter((item) => item._id !== id));
        console.log("Artikel deleted successfully");
      } catch (error) {
        console.error("Error deleting artikel:", error);
      }
    } else {
      console.log("Delete action cancelled");
    }
  };

  return (
    <div className="p-4 border-2 border-gray-200 shadow-md rounded-lg dark:border-gray-700 mt-14">
      <h1 className="text-2xl font-bold mb-3">Artikel</h1>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => navigate("create")}
      >
        Tambah Artikel
      </button>
      {artikel.map((item) => (
        <div
          key={item._id}
          className="p-4 border-2 border-gray-200 shadow-md rounded-lg text-center dark:border-gray-700"
        >
          <h2 className="text-xl font-bold mb-2">{item.title}</h2>
          <h2 className="text-lg font-bold mb-2">{item.penulis}</h2>
          <h2 className="text-md font-bold mb-2">{item.tahun}</h2>
          <img
            src={item.img}
            alt={item.title}
            className="w-1/2 h-auto mx-auto mb-4"
          />
          <div className="mx-10">
            {item.content.map((artikel, index) => (
              <p className="indent-10 text-justify" key={index}>
                {artikel}
              </p>
            ))}
            <div className="flex mt-3 justify-center">
              <button
                type="button"
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                onClick={() => handleEdit(item._id)}
              >
                Edit
              </button>
              <button
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
