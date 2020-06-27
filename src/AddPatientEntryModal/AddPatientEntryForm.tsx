import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Formik, Form } from 'formik';

import { SelectTypeField, EntryTypeOption } from '../AddPatientModal/FormField';
import { EntryType, NewEntry, NewBaseEntry, NewOccupationalHealthcareEntry, NewHealthCheckEntry } from '../types';
import { useStateValue } from '../state/state';
import BaseEntryField from './BaseEntryField';
import EntryTypeField from './EntryTypeField';

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.OccupationalHealthcare, label: 'Occupational Healthcare'},
  { value: EntryType.HealthCheck, label: 'Health Check'}
];

const baseEntryInitialValues: NewBaseEntry = {
  description: '',
  date: '',
  specialist: '',
  diagnosisCodes: []
};

const healthCheckEntryInitialValues: NewHealthCheckEntry = {
  type: 'HealthCheck',
  healthCheckRating: 0,
  ...baseEntryInitialValues
};

const occupationalHealthcareEntryInitialValues: NewOccupationalHealthcareEntry = {
  type: 'OccupationalHealthcare',
  employerName: '',
  ...baseEntryInitialValues
};

const AddPatientEntryForm: React.FC<Props> = ({
  onSubmit,
  onCancel
}) => {
  const [{diagnosis}] = useStateValue();

  const initialValues: any = (type: any) => {
    switch(type) {
      case EntryType.HealthCheck:
        return healthCheckEntryInitialValues;
      case EntryType.OccupationalHealthcare:
        return occupationalHealthcareEntryInitialValues;
      default:
        return occupationalHealthcareEntryInitialValues;
    }
  };

  return (
    <Formik
      initialValues={initialValues(EntryType.HealthCheck)}
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
      {({ values, isValid, dirty, handleChange, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <BaseEntryField
              diagnosis={diagnosis}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <SelectTypeField
              label='Type'
              name='type'
              options={entryTypeOptions}
              onChange={handleChange}
            />
            <EntryTypeField
              entryType={values.type}
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
