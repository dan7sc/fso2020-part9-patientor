import React, { useState } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Formik, Form } from 'formik';

import { EntryType, NewEntry, NewBaseEntry, NewOccupationalHealthcareEntry, NewHealthCheckEntry } from '../types';
import { useStateValue } from '../state/state';
import BaseEntryField from './BaseEntryField';
import EntryTypeField from './EntryTypeField';

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
  entryType: any;
}

const baseEntryInitialValues: NewBaseEntry = {
  description: '',
  date: '',
  specialist: '',
  diagnosisCodes: []
};

const healthCheckEntryInitialValues: NewHealthCheckEntry = {
  ...baseEntryInitialValues,
  type: EntryType.HealthCheck,
  healthCheckRating: 0
};

const occupationalHealthcareEntryInitialValues: NewOccupationalHealthcareEntry = {
  ...baseEntryInitialValues,
  type: EntryType.OccupationalHealthcare,
  employerName: '',
  sickLeave: {
    startDate: '',
    endDate: ''
  }
};

const initialValues: any = {
  'HealthCheck': healthCheckEntryInitialValues,
  'OccupationalHealthcare': occupationalHealthcareEntryInitialValues
};

const AddPatientEntryForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
  entryType
}) => {
  const [{diagnosis}] = useStateValue();

  // const [initialValues, setInitialValues] = useState<NewEntry>(occupationalHealthcareEntryInitialValues);

  // if (entryType !== initialValues.type) {
  //   switch(entryType) {
  //     case 'HealthCheck':
  //       setInitialValues(healthCheckEntryInitialValues);
  //       break;
  //     case 'OccupationalHealthcare':
  //       setInitialValues(occupationalHealthcareEntryInitialValues);
  //       break;
  //     default:
  //       setInitialValues(initialValues);
  //       break;
  //   }
  // }

  console.log('****', entryType, initialValues[entryType].type);

  return (
    <Formik
      initialValues={initialValues[entryType]}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.name = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
        }
        return errors;
      }}
    >
      {({ values, isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <BaseEntryField
              diagnosis={diagnosis}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <EntryTypeField
              entryType={values.type}
              initial={values}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button
                  type="cancel"
                  color="red"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddPatientEntryForm;
