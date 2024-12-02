import { useState, useEffect, useContext } from "react";
import styles from "./styles.module.scss";
import user from "../../../assets/UserDefault.png";
import { AuthContext } from "../../../Contexts/UserContext";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const EditProfile = ({ isOpen, onClose }) => {
  const { user: currentUser, updateUser } = useContext(AuthContext); // Obtém o contexto de autenticação
  const [name, setName] = useState(currentUser?.name || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || user);
  const [email, setEmail] = useState(currentUser?.email || "");
  const [password, setPassword] = useState("");

  const handleFile = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        const reader = new FileReader();

        reader.onloadend = () => {
          setAvatar(reader.result); // Exibe a imagem carregada
        };

        reader.readAsDataURL(image);
      } else {
        toast.error("Por favor, envie uma imagem válida (PNG ou JPEG).");
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      //Carrega os dados do usuário quando o modal abre
      setName(currentUser?.name || "");
      setAvatar(currentUser?.avatar || user);
      setEmail(currentUser?.email || "");
      setPassword(""); //Não exibe a senha anterior por segurança
    }
  }, [isOpen, currentUser]);
  

  const handleSave = async () => {
    try {
      const updatedData = {
        name,
        email,
        ...(password && { password }), // Só envia a senha se ela foi preenchida
      };

      if (avatar !== currentUser.avatar) {
        updatedData.avatar = avatar; // Inclui o avatar apenas se ele mudou
      }
  
      await updateUser({ name, avatar }, currentUser.id); // Atualiza o perfil no backend
      toast.success("Perfil atualizado com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar o perfil:", error);
      toast.error("Erro ao atualizar o perfil. Tente novamente.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <form className={styles.innerModal} onClick={(e) => e.stopPropagation()}>
        <label>Editar Perfil</label>
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
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Nome</label>
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="password"
              placeholder="Digite sua nova senha"
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Senha</label>
          </div>
          <div className={styles.buttonContainer}>
            <button type="button" onClick={handleSave} className={styles.save}>
              Salvar
            </button>
            <button type="button" onClick={onClose} className={styles.cancel}>
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;