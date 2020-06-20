import React from 'react';

import { useStateValue } from "../state";
import { Entry } from "../types";

const HealthCheckEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnosis },] = useStateValue();

  return (
    <div>
        <div key={entry.id}>
          <div>{entry.date} <i>{entry.description}</i></div>
          <ul>
          {entry.diagnosisCodes
            ? entry.diagnosisCodes.map(code => (
              <li key={code}>{code} {diagnosis[code] ? diagnosis[code].name : ''}</li>
            ))
            : null}
          </ul>
        </div>
    </div>
  );
};

export default HealthCheckEntry;
