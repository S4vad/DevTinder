import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import { UserCard } from "./UserCard";

export const Feed = () => {
  const feed = useSelector((store) => store.feed);
  console.log('the feed is ',feed)
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const { data } = await axios.get("/feed");
      dispatch(addFeed(data.data)); // fixed typo: dispacth -> dispatch
      console.log(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log("the feed", feed);

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      {feed.length === 0 ? (
        <p>No new users to show</p>
      ) : (
        feed.map((user) => <UserCard key={user._id} user={user} />)
      )}
    </div>
  );
};
