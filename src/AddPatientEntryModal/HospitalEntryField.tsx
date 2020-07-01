import React from 'react';
import { Field } from 'formik';
import { string, object } from 'yup';

import { TextField } from '../AddPatientModal/FormField';
import { EntryType, NewHospitalEntry } from '../types';
import { baseEntryInitialValues } from './BaseEntryField';

export const hospitalEntryValidation = {
  type: string()
    .required('Field is required'),
  discharge: object().shape({
    date: string()
      .matches(
        /\d{4}-\d{2}-\d{2}/,
        'Date must be in format YYYY-MM-DD (e.g. 1900-12-30)'
      )
    .required('Field is required'),
    criteria: string()
      .required('Field is required')
  })
};

export const hospitalEntryInitialValues: NewHospitalEntry = {
  ...baseEntryInitialValues,
  type: EntryType.Hospital,
  discharge: {
    date: '',
    criteria: ''
  }
};

const HospitalEntryField = () => {
  return (
    <>
      <Field as="fieldset" >
        <Field as="legend">
          <h5>Discharge</h5>
        </Field>
        <Field
          label="Date"
          placeholder="YYYY-MM-DD"
          name="discharge.date"
          component={TextField}
        />
        <Field
          label="Criteria"
          placeholder="Criteria"
          name="discharge.criteria"
          component={TextField}
        />
      </Field>
    </>
  );
};

export default HospitalEntryField;
