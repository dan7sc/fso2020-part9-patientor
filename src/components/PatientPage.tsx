import React from 'react';
import axios from "axios";
import { Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient } from "../state";
import { Patient } from "../types";
import PatientEntry from "./PatientEntry";

const PatientPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatientById = async (id: string) => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    if (!patient[id] || patient[id].id !== id) {
      fetchPatientById(id);
    }
  }, [dispatch]); // eslint-disable-line

  if (!patient[id]) {
    return null;
  }

  let iconName: 'mars' | 'venus' | 'neuter' | undefined;

  if (patient[id].gender) {
    const gender = patient[id].gender;

    if (gender === 'male') {
      iconName = 'mars';
    } else if (gender === 'female') {
      iconName = 'venus';
    } else {
      iconName = 'neuter';
    }
  }

  return (
    <div>
      <h2>
        {patient[id].name}
        <Icon name={iconName} />
      </h2>
      <div>ssn: {patient[id].ssn}</div>
      <div>occupation: {patient[id].occupation}</div>
      <PatientEntry entries={patient[id].entries} />
    </div>
  );
};

export default PatientPage;
