import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import user from "../../../assets/UserDefault.png";

// eslint-disable-next-line react/prop-types
const EditProfile = ({ isOpen, onClose }) => {
  const [name, setName] = useState(localStorage.getItem("nome"));
  const [avatar, setAvatar] = useState(localStorage.getItem("imagem"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [password, setPassword] = useState(localStorage.getItem("password"));

  const handleFile = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        const reader = new FileReader();

        reader.onloadend = () => {
          setAvatar(reader.result);
          localStorage.setItem("imagem", reader.result);
        };

        reader.readAsDataURL(image);
      } else {
        alert("Please upload a valid PNG or JPEG image.");
        setAvatar(null);
        return;
      }
    }
  };

  useEffect(() => {
    setName(localStorage.getItem("nome"));
    setAvatar(localStorage.getItem("imagem"));
    setEmail(localStorage.getItem("email"));
    setPassword(localStorage.getItem("password"));
  }, [isOpen]);

  const handleSave = () => {
    localStorage.setItem("imagem", avatar);
    localStorage.setItem("nome", name);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <form className={styles.innerModal} onClick={(e) => e.stopPropagation()}>
        <label>Profile</label>
        <div className={styles.inputs}>
          <div className={styles.avatarWrapper}>
            <img
              src={avatar || user}
              alt="User Avatar"
              className={styles.avatar}
              onClick={() => document.getElementById("avatarInput").click()}
            />
            <input
              id="avatarInput"
              type="file"
              accept="image/*"
              onChange={handleFile}
              style={{ display: "none" }}
            />
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Name</label>
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="password"
              placeholder="*******"
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          <div className={styles.buttonContainer}>
            <button type="button" onClick={handleSave} className={styles.save}>
              Save
            </button>
            <button type="button" onClick={onClose} className={styles.cancel}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
