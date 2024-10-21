import styles from "./styles.module.scss";

function TemperatureModal({ children, onClose, isModalVisible }) {
  const handleOverlayClick = (e) => {
    // Verifica se o clique foi diretamente no overlay
    if (e.target.classList.contains(styles.modalOverlay)) {
      onClose();
    }
  };

  //TODO: Entender como funciona, isModalVisible funciona no GraphicContainer, é por aqui o problema

  return (
    <div
      className={`${styles.modalOverlay} ${
        isModalVisible ? styles.visible : styles.hidden
      }`}
      onClick={handleOverlayClick}
    >
      <div className={styles.innerModal}>{children}</div>
    </div>
  );
}

export default TemperatureModal;
