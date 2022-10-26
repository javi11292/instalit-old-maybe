/* eslint-disable @typescript-eslint/no-explicit-any */

import { Fragment } from "react";
import styles from "./index.module.scss";
import variables from "./variables.module.scss";

interface Data {
  header: {
    element: React.ReactNode;
    sort: (a: any, b: any) => number;
  }[];
  body: {
    element: React.ReactNode;
    value: any;
  }[][];
}

export default function Table({ data }: { data?: Data }) {
  if (!data) return null;

  const { header, body } = data;
  const columns = header.length;

  return (
    <div className={styles.container} style={{ [variables.columns]: columns }}>
      <div className={styles.header}>
        {header.map(({ element }, index) => (
          <Fragment key={index}>{element}</Fragment>
        ))}
      </div>
      {body.map((elements, index) => (
        <div key={index} className={styles.row}>
          {elements.map(({ element }, index) => (
            <Fragment key={index}>{element}</Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}
