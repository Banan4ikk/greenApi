import React from "react";
import classNames from "classnames";
import "./message.scss";

const Message = ({
  text,
  sender,
}: {
  text: string;
  sender: "me" | "other";
}) => {
  return <div className={classNames("message", sender)}>{text}</div>;
};

export default Message;
