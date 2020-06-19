import React from 'react';

import { Entry } from "../types";

const PatientEntry: React.FC<{ entries: Entry[] }> = ({ entries }) => {
  if (!entries) {
    return null;
  }

  return (
    <div>
      <p></p>
      <h3>entries</h3>
      {entries.map(entry => (
        <div key={entry.id}>
          <div>{entry.date} <i>{entry.description}</i></div>
          <ul>
          {entry.diagnosisCodes
            ? entry.diagnosisCodes.map(code => (
              <li key={code}>{code}</li>
            ))
            : null}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientEntry;
