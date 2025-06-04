import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

export const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.request);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("/user/requests/received");
      console.log(res.data.data);
      dispatch(addRequest(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleClick = async (status, id) => {
    try {
      const res = await axios.post(`/request/review/${status}/${id}`);
      console.log(res);
      console.log("the ", res.data);
      if (res.data.success || res.status === 200) {
        dispatch(removeRequest(id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mt-6  mx-auto">
      {requests?.length === 0 ? (
        <div className="text-gray-500 text-center">No connection Request</div>
      ) : (
        <ul className="list bg-base-100 rounded-box shadow-md">
          {requests?.map((request) => (
            <li key={request._id} className="list-row">
              <div>
                <img
                  className="size-10 rounded-box object-cover"
                  src={request.fromUserId.photoUrl}
                />
              </div>
              <div>
                <div>
                  {request.fromUserId.firstName} {request.fromUserId.lastName}
                </div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {request.fromUserId.about}
                </div>
              </div>
              <button
                className="btn bg-primary p-2"
                onClick={() => handleClick("accepted", request._id)}
              >
                Accept
              </button>
              <button
                className="btn bg-secondary p-2"
                onClick={() => handleClick("rejected", request._id)}
              >
                Reject
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
