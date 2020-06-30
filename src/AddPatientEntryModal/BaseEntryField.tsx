import React from 'react';
import { Field } from 'formik';
import { string, array } from 'yup';

import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';
import { Diagnosis, NewBaseEntry } from '../types';

interface Props {
  diagnosis: { [code: string]: Diagnosis };
  setFieldValue: (field: string, value: string, shouldValidate?: boolean | undefined) => void;
  setFieldTouched: (field: string, isTouched?: boolean | undefined, shouldValidate?: boolean | undefined) => void;
}

export const baseEntryValidation = {
  description: string()
    .required('Field is required'),
  date: string()
    .matches(
      /\d{4}-\d{2}-\d{2}/,
      'Date must be in format YYYY-MM-DD (e.g. 1900-12-30)'
    )
    .required('Field is required'),
  specialist: string()
    .required('Field is required'),
  diagnosisCodes: array()
    .of(string())
};

export const baseEntryInitialValues: NewBaseEntry = {
  description: '',
  date: '',
  specialist: '',
  diagnosisCodes: []
};

const BaseEntryField: React.FC<Props> = ({
  diagnosis,
  setFieldValue,
  setFieldTouched
}) => {
  return (
    <>
      <Field
        label="Date"
        placeholder="YYYY-MM-DD"
        name="date"
        component={TextField}
      />
      <Field
        label="Specialist"
        placeholder="Specialist"
        name="specialist"
        component={TextField}
      />
      <Field
        label="Description"
        placeholder="Description"
        name="description"
        component={TextField}
      />
      <DiagnosisSelection
        diagnoses={Object.values(diagnosis)}
        setFieldValue={setFieldValue}
        setFieldTouched={setFieldTouched}
      />
    </>
  );
};

export default BaseEntryField;
