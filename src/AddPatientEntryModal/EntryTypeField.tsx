import React from 'react';

import { EntryType, NewEntry } from '../types';

import HealthCheckEntryField from './HealthCheckEntryField';
import OccupationalHealthcareEntryField from './OccupationalHealthcareEntryField';

interface Props {
  entryType: 'OccupationalHealthcare' | 'HealthCheck';
  initial: NewEntry
}

const EntryTypeField: React.FC<Props> = ({ entryType, initial }) => {
  switch(entryType) {
    case EntryType.OccupationalHealthcare:
      console.log('occup', initial);
      return <OccupationalHealthcareEntryField />;
    case EntryType.HealthCheck:
      console.log('health', initial);
      return <HealthCheckEntryField />;
    default:
      return null;
  }
};

export default EntryTypeField;
