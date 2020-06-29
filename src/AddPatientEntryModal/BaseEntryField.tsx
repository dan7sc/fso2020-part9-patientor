import React from 'react';
import { Field } from 'formik';

import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';
import { Diagnosis, NewBaseEntry } from '../types';

interface Props {
  diagnosis: { [code: string]: Diagnosis };
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
  setFieldTouched: (field: string, isTouched?: boolean | undefined, shouldValidate?: boolean | undefined) => void;
}

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
