import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { Link } from "react-router-dom";
import { Loader } from "../components/Loader";

export const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connection);
  const [loading, setLoading] = useState(true);

  const fetchConnections = async () => {
    try {
      const res = await axios.get("/user/connections");
      console.log(res.data.data);
      dispatch(addConnection(res.data.data));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading) {
    return <Loader/>
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      {connections?.length === 0 ? (
        <div className="text-center">
          <p>No connection found. Go to feed and grow connection.</p>
          <Link to="/feed" className="text-blue-600 underline">
            Go to Feed
          </Link>
        </div>
      ) : (
        <ul className="space-y-2">
          {connections?.map((connection) => (
            <li
              key={connection._id}
              className="flex items-center gap-2 p-4 bg-base-100 rounded-box shadow-md "
            >
              <img
                className="size-10 rounded-box object-cover"
                src={connection.photoUrl}
              />
              <div>
                <div>
                  {connection.firstName} {connection.lastName}
                </div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {connection.about}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
