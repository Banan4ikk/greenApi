import React, { useEffect, useState } from "react";
import Modal from "../../Modal";
import {
  STORAGE_API_TOKEN_INSTANCE,
  STORAGE_API_URL,
  STORAGE_ID_INSTANCE,
} from "../../../constants";

type InstanceDataProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddInstanceData: React.FC<InstanceDataProps> = ({ isOpen, onClose }) => {
  const [apiUrl, setApiUrl] = useState("");
  const [idInstance, setIdInstance] = useState("");
  const [apiToken, setApiToken] = useState("");

  const [disabled, setDisabled] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "apiUrl":
        setApiUrl(e.target.value);
        break;
      case "idInstance":
        setIdInstance(e.target.value);
        break;
      case "apiToken":
        setApiToken(e.target.value);
        break;
      default:
        break;
    }
  };

  const onSubmit = () => {
    localStorage.setItem(STORAGE_API_URL, JSON.stringify(apiUrl));
    localStorage.setItem(STORAGE_ID_INSTANCE, JSON.stringify(idInstance));
    localStorage.setItem(STORAGE_API_TOKEN_INSTANCE, JSON.stringify(apiToken));
    onClose();
  };

  useEffect(() => {
    setDisabled(!!apiToken.length || !!apiUrl.length || !!idInstance.length);
  }, [apiUrl, apiToken, idInstance]);

  return (
    <Modal onSubmit={onSubmit} isOpen={isOpen} hideClose disabled={disabled}>
      <h2>Добавить данные инстантса</h2>
      <form>
        <input
          type="text"
          name="apiUrl"
          placeholder="Введите Api Url"
          value={apiUrl}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="idInstance"
          placeholder="Введите Id instance"
          value={idInstance}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="apiToken"
          placeholder="Введите api token instance"
          value={apiToken}
          onChange={handleInputChange}
          required
        />
      </form>
    </Modal>
  );
};

export default AddInstanceData;
