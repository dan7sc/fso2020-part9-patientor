import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import { object } from 'yup';

import { NewEntry, EntryType } from '../types';
import { useStateValue } from '../state/state';
import BaseEntryField, { baseEntryValidation } from './BaseEntryField';
import { healthCheckEntryInitialValues, healthCheckEntryValidation } from './HealthCheckEntryField';
import { occupationalHealthcareEntryInitialValues, occupationalHealthcareEntryValidation } from './OccupationalHealthcareEntryField';
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

const getSchema = (type: string) => {
  let schema;
  if (type === EntryType.OccupationalHealthcare) {
    schema = object().shape({
      ...baseEntryValidation,
      ...occupationalHealthcareEntryValidation,
    });
  } else if (type === EntryType.HealthCheck) {
    schema = object().shape({
      ...baseEntryValidation,
      ...healthCheckEntryValidation,
    });
  }
  return schema;
};

const AddPatientEntryForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
  entryType
}) => {
  const [{diagnosis}] = useStateValue();

  const schemaToValidate = getSchema(entryType);

  return (
    <Formik
      initialValues={initialValues[entryType]}
      onSubmit={onSubmit}
      enableReinitialize={true}
      validationSchema={schemaToValidate}
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
