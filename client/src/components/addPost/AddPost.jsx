import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import "./addPost.scss";


const AddPost = () => {
  return (
      <div className="addPost">
        <div className="container">
          <div className="top">
            <img src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
            <textarea col={5} placeholder="What's on your mind John Doe ?" />
          </div>
          <div className="bottom">
            <div className="icons">
              <div className="icon">
                <ImageOutlinedIcon style={{ color: "#4caf50" }} />
                <span>Add image</span>
              </div>
              <div className="icon">
                <PlaceOutlinedIcon style={{ color: "#f44336" }} />
                <span>Add place</span>
              </div>
              <div className="icon">
                <PersonAddOutlinedIcon style={{ color: "#3f51b5" }} />
                <span>Tag friends</span>
              </div>
            </div>
            <button>Share</button>
          </div>
        </div>
      </div>
  )
}

export default AddPost
