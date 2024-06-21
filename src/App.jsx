import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardContent from "./components/DashboardContent";
import ArtikelContent from "./components/ArtikelContent";
import CreateArtikel from "./components/CreateArtikel";
import EditArtikel from "./components/EditArtikel";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<DashboardAdmin />}>
          <Route index element={<DashboardContent />} />
          <Route path="artikel" element={<ArtikelContent />} />
          <Route path="artikel/create" element={<CreateArtikel />} />
          <Route path="artikel/edit/:id" element={<EditArtikel />} />
        </Route>
      </Routes>
    </>
  );
}
