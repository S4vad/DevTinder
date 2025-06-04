import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect, useState } from "react";
import { UserCard } from "./UserCard";
import { SyncLoader  } from "react-spinners";

export const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    photoUrl: "",
    about: "",
  });

  // Load data from Redux store into local form state once
  useEffect(() => {
    if (userData) {
      setUser({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        photoUrl: userData.photoUrl || "",
        about: userData.about || "",
      });
    }
  }, [userData]);

  if (user.firstName === "") {
    return (
      <div className="flex justify-center items-center h-screen">
        <SyncLoader color="#3B82F6" size={13}/> {/*this code for show loading befor useeffect and after intial state "" */}
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const { data } = await axios.patch("/profile/edit", user);
      console.log("Updated user data:", data.data);
      dispatch(addUser(data.data)); // Update Redux after successful save
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex justify-center my-20 gap-10 flex-wrap">
      <div className="card card-border bg-base-100 w-96">
        <div className="card-body">
          <h2 className="card-title">Edit Profile</h2>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <input
              type="text"
              className="input"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              placeholder="First name"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              type="text"
              className="input"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              placeholder="Last name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">phot URL</legend>
            <input
              type="text"
              className="input"
              name="photoUrl"
              value={user.photoUrl}
              onChange={handleChange}
              placeholder="photo url"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">about</legend>
            <input
              type="text"
              className="input"
              name="about"
              value={user.about}
              onChange={handleChange}
              placeholder="about"
            />
          </fieldset>

          <div className="card-actions justify-end m-auto">
            <button onClick={handleSave} className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Live preview using local form state */}
      <UserCard user={user} />
    </div>
  );
};
