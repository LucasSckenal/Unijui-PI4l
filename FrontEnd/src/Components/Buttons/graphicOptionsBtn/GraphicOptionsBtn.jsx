// GraphicsOptions.jsx
import styles from "./styles.module.scss";

const GraphicsOptions = ({ options, isActiveOptions = [], onToggle }) => {
  return (
    <div className={styles.graphsInputs}>
      <div className={styles.innerButton}>
        {options.map((option) => (
          <div
            key={option.id}
            className={styles.optionContainer}
            style={{ display: "flex", flexDirection: "row" }}
            onClick={() => {
              const isActive = isActiveOptions.includes(option.id);
              onToggle(option.id, !isActive);
            }}
          >
            <p>
              {isActiveOptions.includes(option.id)
                ? `Ocultar ${option.label}`
                : `Mostrar ${option.label}`}
            </p>
            <div
              className={
                isActiveOptions.includes(option.id)
                  ? styles.toggleCheckedOptions
                  : styles.toggleUncheckedOptions
              }
            >
              <div className={styles.toggleBallOptions}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GraphicsOptions;
