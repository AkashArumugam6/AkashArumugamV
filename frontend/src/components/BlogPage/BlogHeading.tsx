import { useNavigate } from "react-router-dom";
import "./BlogPage.css";

const Header = () => {
  const navigate = useNavigate();

  const handleCreateBlog = () => {
    // Navigate to the create blog page
    navigate("/blogs/create");
  };

  return (
    <div className="blogTitle">
      <div>
        <h1 className="typing-animation">Blog Your Ideas!</h1>
      </div>
      <div>
        <button className="create" onClick={handleCreateBlog}>
          Create Blog
        </button>
      </div>
    </div>
  );
};

export default Header;