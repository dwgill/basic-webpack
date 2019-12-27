import React, { useState, useCallback } from "react";
import styles from "./App2.scss";

const App2 = () => {
  const [state, setState] = useState(0);
  const incrementState = useCallback(() => setState(s => s + 1), [setState]);

  return (
    <>
      <h1 className={styles.header}>Clicks: {state}</h1>
      <button className={styles.button} onClick={incrementState}>
        Click me
      </button>
    </>
  );
};

export default App2;
