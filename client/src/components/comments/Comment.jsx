const Comment = ({ comment }) => {
  return (
    <div className="comment" key={comment._id}>
      <img
        src={comment.userId.profilePic || "https://github.com/shadcn.png"}
        alt=""
      />
      <div className="info">
        <span className="name">{comment.userId.username}</span>
        <p className="desc">{comment.desc}</p>
      </div>
      <span className="date">1 hour ago</span>
    </div>
  );
};

export default Comment;
