import React, { useState } from 'react';

import { EntryTypeSelectForm, EntryTypeOption } from '../AddPatientModal/FormField';
import { EntryType, NewEntry } from '../types';
import AddPatientEntryForm from './AddPatientEntryForm';

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.Hospital, label: 'Hospital' },
  { value: EntryType.OccupationalHealthcare, label: 'Occupational Healthcare' },
  { value: EntryType.HealthCheck, label: 'Health Check' }
];

const SelectEntryTypeForm: React.FC<Props> = ({
  onSubmit,
  onCancel
}) => {
  const [entryType, setEntryType] = useState<string>('HealthCheck');
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const entryType = event.target.value;
    setEntryType(entryType);
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
