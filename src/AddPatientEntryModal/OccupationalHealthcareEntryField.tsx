import React from 'react';
import { Field } from 'formik';

import { TextField } from '../AddPatientModal/FormField';
import { EntryType, NewOccupationalHealthcareEntry } from '../types';
import { baseEntryInitialValues } from './BaseEntryField';

export const occupationalHealthcareEntryInitialValues: NewOccupationalHealthcareEntry = {
  ...baseEntryInitialValues,
  type: EntryType.OccupationalHealthcare,
  employerName: '',
};

const OccupationalHealthcarekEntryField = () => {
  return (
    <Field
      label="Employer Name"
      placeholder="Employer Name"
      name="employerName"
      component={TextField}
    />
  );
};

export default OccupationalHealthcarekEntryField;
