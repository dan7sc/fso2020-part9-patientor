import React from 'react';
import { Field } from 'formik';
import { string, number } from 'yup';

import { NumberField } from '../AddPatientModal/FormField';
import { EntryType, NewHealthCheckEntry } from '../types';
import { baseEntryInitialValues } from './BaseEntryField';

export const healthCheckEntryValidation = {
  type: string()
    .required('Field is required'),
  healthCheckRating: number()
    .integer()
    .min(0)
    .max(3)
    .required('Field is required')
};

export const healthCheckEntryInitialValues: NewHealthCheckEntry = {
  ...baseEntryInitialValues,
  type: EntryType.HealthCheck,
  healthCheckRating: 0
};

const HealthCheckEntryField = () => {
  return (
    <Field
      label="Health Check Rating"
      name="healthCheckRating"
      min={0}
      max={3}
      component={NumberField}
    />
  );
};

export default HealthCheckEntryField;
