// GraphicsOptions.jsx
import styles from "./styles.module.scss";

const GraphicsOptions = ({ options, isActiveOptions = [], onToggle }) => {
  return (
    <div className={styles.graphsInputs}>
      <div className={styles.innerButton}>
        {options.map((option) => {
          const isActive = isActiveOptions.includes(option.id);
          return (
            <div
              key={option.id}
              className={styles.optionContainer}
              style={{ display: "flex", flexDirection: "row" }}
              onClick={() => onToggle(option.id, !isActive)}
            >
              <p>{option.label}</p>
              <div
                className={
                  isActive
                    ? styles.toggleCheckedOptions
                    : styles.toggleUncheckedOptions
                }
              >
                <div className={styles.toggleBallOptions}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GraphicsOptions;
