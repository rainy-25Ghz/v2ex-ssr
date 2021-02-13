import styles from "./loading.module.css";
export const Loading = () => {
  return (
    <div>
      <div className={styles.ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
