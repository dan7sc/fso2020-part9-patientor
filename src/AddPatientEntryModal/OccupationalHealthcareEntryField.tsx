import React from 'react';
import { Field } from 'formik';
import { string, object } from 'yup';

import { TextField } from '../AddPatientModal/FormField';
import { EntryType, NewOccupationalHealthcareEntry } from '../types';
import { baseEntryInitialValues } from './BaseEntryField';

export const occupationalHealthcareEntryValidation = {
  type: string()
    .required('Field is required'),
  employerName: string()
    .required('Field is required'),
  sickLeave: object().shape({
    startDate: string()
      .matches(
        /\d{4}-\d{2}-\d{2}/,
        'Start Date must be in format YYYY-MM-DD (e.g. 1900-12-30)'
      )
    .required('Field is required'),
    endDate: string()
      .matches(
        /\d{4}-\d{2}-\d{2}/,
        'End Date must be in format YYYY-MM-DD (e.g. 1900-12-30)'
      )
      .required('Field is required')
  })
};

export const occupationalHealthcareEntryInitialValues: NewOccupationalHealthcareEntry = {
  ...baseEntryInitialValues,
  type: EntryType.OccupationalHealthcare,
  employerName: '',
  sickLeave: {
    startDate: '',
    endDate: ''
  }
};

const OccupationalHealthcarekEntryField = () => {
  return (
    <>
      <Field
        label="Employer Name"
        placeholder="Employer Name"
        name="employerName"
        component={TextField}
      />
      <Field as="fieldset" >
        <Field as="legend">
          <h5>Sick Leave</h5>
        </Field>
        <Field
          label="Start Date"
          placeholder="YYYY-MM-DD"
          name="sickLeave.startDate"
          component={TextField}
        />
        <Field
          label="End Date"
          placeholder="YYYY-MM-DD"
          name="sickLeave.endDate"
          component={TextField}
        />
      </Field>
    </>
  );
};

export default OccupationalHealthcarekEntryField;
