import React from 'react';
import { Field } from 'formik';

import { NumberField } from '../AddPatientModal/FormField';

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