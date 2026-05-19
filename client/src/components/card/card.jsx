import { Link } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import "./card.scss";
import { useState } from "react";
import Chat from "../chat/Chat";

function Card({ item }) {
  const [showChat, setShowChat] = useState(false);

  const showChatHandler = () => {
    setShowChat((prev) => !prev);
  };

  const handleSave = async () => {
    try {
      await apiRequest.post("/posts/save", {
        postId: item.id,
      });
      console.log("Post saved");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="card">
        <Link to={`/${item.id}`} className="imageContainer">
          <img src={item.images[0]} alt="" />
        </Link>

        <div className="textContainer">
          <h2 className="title">
            <Link to={`/${item.id}`}>{item.title}</Link>
          </h2>

          <p className="address">
            <img src="/pin.png" alt="" />
            <span>{item.address}</span>
          </p>

          <p className="price">$ {item.price}</p>

          <div className="bottom">
            <div className="features">
              <div className="feature">
                <img src="/bed.png" alt="" />
                <span>{item.bedroom} bedroom</span>
              </div>

              <div className="feature">
                <img src="/bath.png" alt="" />
                <span>{item.bathroom} bathroom</span>
              </div>
            </div>

            <div className="icons">
              <div className="icon">
                <img src="/save.png" onClick={handleSave} alt="" />
              </div>

              <div className="icon" onClick={showChatHandler}>
                <img src="/chat.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showChat && <Chat />}
    </>
  );
}

export default Card;
