import styles from "./styles.module.scss";

// eslint-disable-next-line react/prop-types
const Frame = ({ isTitle, title, width, height, children }) => {
  return (
    <div className={styles.FrameGraph} style={{ width: width, height: height }}>
      {isTitle ? <p>{title}</p> : null}
      {children}
    </div>
  );
};

export default Frame;
