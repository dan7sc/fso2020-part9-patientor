import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Formik, Form } from 'formik';

import { NewEntry } from '../types';
import { useStateValue } from '../state/state';
import BaseEntryField from './BaseEntryField';
import { healthCheckEntryInitialValues } from './HealthCheckEntryField';
import { occupationalHealthcareEntryInitialValues } from './OccupationalHealthcareEntryField';
import EntryTypeField from './EntryTypeField';

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
  entryType: string;
}

interface ValuesProps {
  [index: string]: NewEntry;
}

const initialValues: ValuesProps = {
  HealthCheck: healthCheckEntryInitialValues,
  OccupationalHealthcare: occupationalHealthcareEntryInitialValues
};

const AddPatientEntryForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
  entryType
}) => {
  const [{diagnosis}] = useStateValue();

  return (
    <Formik
      initialValues={initialValues[entryType]}
      onSubmit={onSubmit}
      enableReinitialize={true}
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
            />
            <br />
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
