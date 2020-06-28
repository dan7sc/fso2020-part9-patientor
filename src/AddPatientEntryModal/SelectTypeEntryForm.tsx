import React, { useState } from 'react';

import { EntryTypeSelectForm, EntryTypeOption } from '../AddPatientModal/FormField';
import { EntryType, NewEntry } from '../types';
import AddPatientEntryForm from './AddPatientEntryForm';

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.OccupationalHealthcare, label: 'Occupational Healthcare'},
  { value: EntryType.HealthCheck, label: 'Health Check'}
];

const SelectEntryTypeForm: React.FC<Props> = ({
  onSubmit,
  onCancel
}) => {
  const [entryType, setEntryType] = useState('HealthCheck');

  const handleSelectChange = (event: any) => {
    const type = event.target.value;
    setEntryType(type);
  };

  return (
    <>
      <EntryTypeSelectForm
        label='Type'
        name='type'
        value={entryType}
        options={entryTypeOptions}
        onChange={handleSelectChange}
      />
      <AddPatientEntryForm
        onSubmit={onSubmit}
        onCancel={onCancel}
        entryType={entryType}
      />
    </>
  );
};

export default SelectEntryTypeForm;
