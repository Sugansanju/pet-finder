import { Route, Routes, useNavigate } from "react-router-dom";
import PetList from "./pages/PetList";
import NavbarComp from "./components/NavbarComp";
import { useDispatch, useSelector } from "react-redux";
import PetForm from "./pages/PetForm";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useEffect } from "react";
import { fetchCurrentUser } from './redux/slice/authSlice';


function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
//   useEffect(() => {
//     if (isAuthenticated) {
//         dispatch(fetchCurrentUser());
//     } else {
//         navigate('/');
//     }
// }, [isAuthenticated, dispatch, navigate]);

  return (
    <>
      <NavbarComp />
      <Routes>
        <Route path="/" element={<PetList />}></Route>
        <Route path="/add" element={<ProtectedRoutes element={PetForm} />} />
      </Routes>
    </>
  );
}

export default App;
