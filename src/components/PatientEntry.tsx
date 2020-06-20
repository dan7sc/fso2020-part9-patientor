import React from 'react';

import { Entry } from "../types";
import EntryDetails from "./EntryDetails";

const PatientEntry: React.FC<{ entries: Entry[] }> = ({ entries }) => {
  if (!entries) {
    return null;
  }

  return (
    <div>
      <p></p>
      <h3>entries</h3>
      {entries.map(entry => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default PatientEntry;
