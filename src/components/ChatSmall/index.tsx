import React from "react";
import classNames from "classnames";
import "./chatSmall.scss";

const ChatSmall = ({
  name,
  message,
  time,
  active,
}: {
  name: string;
  message: string;
  time: string;
  active?: boolean;
}) => {
  return (
    <div className={classNames("chat-small", { active })}>
      <div className="chat-info">
        <h4>{name}</h4>
        <p>{message}</p>
      </div>
      <span className="chat-time">{time}</span>
    </div>
  );
};

export default ChatSmall;
