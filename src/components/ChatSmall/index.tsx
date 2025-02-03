import React from "react";
import classNames from "classnames";
import "./chatSmall.scss";

type ChatSmallProps = {
  name: string;
  message?: string;
  active?: boolean;
  onClick: () => void;
};

const ChatSmall: React.FC<ChatSmallProps> = ({
  name,
  message,
  active,
  onClick,
}) => {
  return (
    <div className={classNames("chat-small", { active })} onClick={onClick}>
      <div className="chat-info">
        <span className="user-info">
          Чат с пользователем - <h4>{name}</h4>
        </span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ChatSmall;
