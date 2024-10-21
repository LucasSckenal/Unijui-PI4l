import styles from "./styles.module.scss";

function TemperatureModal({ children, onClose, isVisible, selectedTemp }) {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(styles.modalOverlay)) {
      onClose();
    }
    console.log(selectedTemp);
  };

  return (
    <div
      className={`${styles.modalOverlay} ${
        isVisible ? styles.visible : styles.hidden
      }`}
      onClick={handleOverlayClick}
    >
      <div className={styles.innerModal}>
        <h2>
          Aqui está alguma informação sobre a {selectedTemp || "indefinida"}
        </h2>
        {children}
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default TemperatureModal;
