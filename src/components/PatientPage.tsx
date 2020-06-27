import React from 'react';
import axios from "axios";
import { Icon, Button } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient } from "../state";
import { Patient, NewEntry } from "../types";
import PatientEntry from "./PatientEntry";
import AddPatientEntryModal from "../AddPatientEntryModal" ;

const PatientPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const { id } = useParams<{ id: string }>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatientEntry = async (values: NewEntry) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch({ type: 'UPDATE_PATIENT', payload: updatedPatient });
      closeModal();
    } catch(e) {
      setError(e.response.data.error);
    }
  };

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
      <div style={{ paddingBottom: "10px"}}>
        <h2>
          {patient[id].name}
          <Icon name={iconName} />
        </h2>
        <div>ssn: {patient[id].ssn}</div>
        <div>occupation: {patient[id].occupation}</div>
      </div>
      <AddPatientEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewPatientEntry}
        error={error}
       />
      <Button onClick={() => openModal()}>Add New Entry</Button>
      <PatientEntry entries={patient[id].entries} />
    </div>
  );
};

export default PatientPage;
