import React from 'react';

import { EntryType } from '../types';

import HealthCheckEntryField from './HealthCheckEntryField';
import OccupationalHealthcareEntryField from './OccupationalHealthcareEntryField';

interface Props {
  entryType: 'OccupationalHealthcare' | 'HealthCheck';
}

const EntryTypeField: React.FC<Props> = ({ entryType }) => {
  switch(entryType) {
    case EntryType.OccupationalHealthcare:
      return <OccupationalHealthcareEntryField />;
    case EntryType.HealthCheck:
      return <HealthCheckEntryField />;
    default:
      return null;
  }
};

export default EntryTypeField;
