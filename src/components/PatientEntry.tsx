import React from 'react';
import axios from 'axios';

import { apiBaseUrl } from "../constants";
import { useStateValue, setDiagnosisList } from "../state";
import { Entry, Diagnosis } from "../types";

const PatientEntry: React.FC<{ entries: Entry[] }> = ({ entries }) => {
  const [{ diagnosis }, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchDiagnosis = async () => {
      try {
        const { data: diagnosisFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosisList(diagnosisFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    fetchDiagnosis();
  }, [dispatch]);

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
              <li key={code}>{code} {diagnosis[code] ? diagnosis[code].name : ''}</li>
            ))
            : null}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientEntry;
