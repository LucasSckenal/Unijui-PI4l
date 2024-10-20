import styles from "./styles.module.scss";

const GraphicsBtn = ({ name, onClick, isActive }) => {
  return (
    <div className={styles.graphsInputs} onClick={onClick}>
      <p>{isActive ? `Ocultar ${name}` : `Mostrar ${name}`}</p>
      <div className={isActive ? styles.toggleChecked : styles.toggleUnchecked}>
        <div className={styles.toggleBall}></div>
      </div>
    </div>
  );
};

export default GraphicsBtn;
