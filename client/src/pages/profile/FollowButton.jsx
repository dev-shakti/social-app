import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

async function followUser(userId) {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/user/follow/${userId}`,
      {},
      {
        withCredentials: true,
      }
    );

    if (response?.data?.success) {
      toast.success(response.data.message);
    }

    return response.data;
  } catch (error) {
    console.error(error.message);
    toast.error(error.response?.data?.message || error.message);
  }
}
const FollowButton = ({ userId,isFollowing }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
    },
  });
  return (
    <button
      onClick={() => mutation.mutate(userId)}
      disabled={mutation.isPending}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
