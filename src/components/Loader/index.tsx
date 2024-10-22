import React from "react";
import styles from "./styles.module.scss";

export const Loader: React.FC = () => {
  return (
    <div className={styles.pulse}>
      <img
        src="https://yt3.ggpht.com/-RO20tr8ZmBg/AAAAAAAAAAI/AAAAAAAAAAA/BhQeGSkCSdQ/s108-c-k-c0x00ffffff-no-rj-mo/photo.jpg"
        alt=""
      />
    </div>
  );
};
