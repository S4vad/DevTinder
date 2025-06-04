import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

export const Connections = () => {
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get("/user/connections");
      dispatch(addConnection(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return <div></div>;
};
