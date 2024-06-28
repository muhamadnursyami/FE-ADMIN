import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
export default function PesanContent() {
  const [pesan, setPesan] = useState([]);
  const navigate = useNavigate();

  const fetchDataPesan = async () => {
    try {
      const response = await axios.get(
        "https://high-pearle-istudent-e72a78db.koyeb.app/pesan"
      );
      setPesan(response.data.allPesan);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataPesan();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah kamu yakin untuk menghapus artikel ini?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `https://high-pearle-istudent-e72a78db.koyeb.app/pesan/${id}`
        );
        setPesan(pesan.filter((item) => item._id !== id));
        console.log("Berhasil mendelete pesan");
        toast.success("Berhasil delete pesan");
      } catch (error) {
        console.error("Error deleting pesan:", error);
        toast.error("Gagal Delete pesan");
      }
    } else {
      console.log("Tidak jadi delete");
    }
  };

  return (
    <div className="p-4 border-2 border-gray-200 shadow-md rounded-lg dark:border-gray-700 mt-14">
      <Toaster />
      <h1 className="text-2xl font-bold mb-3">Pesan Yang Masuk</h1>

      {pesan.map((item) => (
        <div
          key={item._id}
          className="p-4 border-2 border-gray-200 shadow-md rounded-lg text-center dark:border-gray-700"
        >
          <h2 className="text-xl font-bold mb-2">{item.name}</h2>
          <h2 className="text-lg font-bold mb-2">{item.email}</h2>
          <h2 className="text-md font-bold mb-2">{item.message}</h2>

          <div className="flex mt-3 justify-center">
            <button
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
