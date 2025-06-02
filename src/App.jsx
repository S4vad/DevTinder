import  { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";

export const App = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const fetchProfile = async () => {
    try {
      console.log('calling')
      const result = await axios.get("profile/view");
      console.log("the user data is", result.data);
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
