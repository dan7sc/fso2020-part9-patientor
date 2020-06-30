import React from 'react';
import { Field } from 'formik';

import { TextField } from '../AddPatientModal/FormField';
import { EntryType, NewOccupationalHealthcareEntry } from '../types';
import { baseEntryInitialValues } from './BaseEntryField';

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
