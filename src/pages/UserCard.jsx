import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

export const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  if (!user) {
    return <div className="p-5">No user data</div>;
  }

  const { _id, photoUrl, firstName, lastName, about } = user;

  const handleClick = async (status) => {
    try {
      await axios.post(`/request/send/${status}/${_id}`);
      dispatch(removeFeed(_id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="card bg-base-300 w-70 shadow-sm m-4">
        <figure>
          <img
            src={photoUrl}
            alt={firstName}
            className="w-full h-60 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
          <p>{about}</p>
          <div className="card-actions justify-center gap-6">
            <button
              className="btn btn-secondary"
              onClick={() => handleClick("interested")}
            >
              Interested
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleClick("ignored")}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
