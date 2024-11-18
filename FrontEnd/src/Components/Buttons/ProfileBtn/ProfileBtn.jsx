import { useState } from "react";
import LogoutBtn from "../LogoutBtn/Logout";
import styles from "./styles.module.scss";
import Divider from "../../Utilities/Divider/Divider";
import EditProfile from "../../Modals/EditProf/EditProfile";
import user from "../../../assets/UserDefault.png";

const ProfileBtn = () => {
  const [visible, setVisible] = useState(false);

  const showList = () => {
    setVisible(!visible);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const avatar = localStorage.getItem("imagem") || user;

  return (
    <div className={styles.ProfileBtn}>
      <button onClick={showList} className={styles.avatar}>
        <img src={avatar} alt="Profile" />
      </button>
      {visible && (
        <ul className={styles.list}>
          <li onClick={openModal}>Edit profile</li>
          <EditProfile isOpen={isModalOpen} onClose={closeModal} />
          <Divider width={90} />
          <LogoutBtn hasText={true} text={"Logout"} />
        </ul>
      )}
    </div>
  );
};

export default ProfileBtn;
