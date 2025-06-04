import  { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";

export const App = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const userData = useSelector((store) => store.user);

  const fetchProfile = async () => {
    try {
      if (userData) return;
      const result = await axios.get("profile/view");
      dispatch(addUser(result.data))
    } catch (error) {
      if(error.status===401){
        navigate('/login')
      }
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile()
  }, []);

  return (
    <div>
        <Navbar />
        <Outlet />
    </div>
  );
};

export default App;
