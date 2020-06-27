import React from 'react';
import { Field } from 'formik';

import { TextField } from '../AddPatientModal/FormField';

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
