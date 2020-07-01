import React from 'react';

import { EntryType } from '../types';
import HospitalEntryField from './HospitalEntryField';
import HealthCheckEntryField from './HealthCheckEntryField';
import OccupationalHealthcareEntryField from './OccupationalHealthcareEntryField';

interface Props {
  entryType: 'Hospital' | 'OccupationalHealthcare' | 'HealthCheck';
}

const EntryTypeField: React.FC<Props> = ({ entryType }) => {
  switch(entryType) {
    case EntryType.Hospital:
      return <HospitalEntryField />;
    case EntryType.OccupationalHealthcare:
      return <OccupationalHealthcareEntryField />;
    case EntryType.HealthCheck:
      return <HealthCheckEntryField />;
    default:
      return null;
  }
};

export default EntryTypeField;
