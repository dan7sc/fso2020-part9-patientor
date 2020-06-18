import React from 'react';
import axios from "axios";
import { Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from "../types";

const PatientDetails: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatientById = async (id: string) => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch({ type: "SET_PATIENT", payload: patientFromApi });
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

  const setGenderIcon = () => {
    const gender = patient[id].gender;

    if (gender === 'male') {
      return <Icon name='mars' />;
    } else if (gender === 'female') {
      return <Icon name='venus' />;
    } else {
      return <Icon name='neuter' />;
    }
  };

  return (
    <div>
      <h2>{patient[id].name} {setGenderIcon()}</h2>
      <div>ssn: {patient[id].ssn}</div>
      <div>occupation: {patient[id].occupation}</div>
    </div>
  );
};

export default PatientDetails;
