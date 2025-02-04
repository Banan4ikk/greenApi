import React, { useEffect } from "react";
import { hideError } from "../../store/errorSlice";
import "./errorStyles.scss";
import { useAppDispatch, useAppSelector } from "../../store";

const ErrorNotification: React.FC = () => {
  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector((state) => state.error.message);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        dispatch(hideError());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage, dispatch]);

  if (!errorMessage) {
    return null;
  }

  return (
    <div className="error-notification">
      <span>{errorMessage}</span>
      <button
        className="close-button"
        type="button"
        onClick={() => dispatch(hideError())}
      >
        &times;
      </button>
    </div>
  );
};

export default ErrorNotification;
