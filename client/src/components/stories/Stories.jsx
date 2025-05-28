import { useQuery } from "@tanstack/react-query";
import AddStoryComponent from "./addStory";
import axios from "axios";

async function fetchStories() {
  try {
    const response = await axios.get(`http://localhost:5000/api/stories/get`, {
      withCredentials: true,
    });

    return response.data.stories;
  } catch (error) {
    console.error(error.message);
  }
}

const Stories = () => {
  const {
    data: stories,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["stories"],
    queryFn: fetchStories,
  });

  if (isPending) return <p>Loading....</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <div className="stories">
      <AddStoryComponent />
      {stories?.map((story) => (
        <div className="story" key={story._id}>
          <img src={story.storyImg} alt="" />
          <span>{story.userId.username}</span>
        </div>
      ))}
    </div>
  );
};

export default Stories;
