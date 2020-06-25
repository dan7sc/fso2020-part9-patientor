import React from 'react';
import { Modal } from 'semantic-ui-react';
import AddPatientEntryForm from './AddPatientEntryForm';
import { NewHealthCheckEntry } from '../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewHealthCheckEntry) => void;
}

const AddPatientEntryModal: React.FC<Props> = ({ modalOpen, onClose, onSubmit}) => {
  return (
    <Modal closeIcon open={modalOpen} onClose={onClose}>
      <Modal.Header>Add a new patient entry</Modal.Header>
      <Modal.Content>
        <AddPatientEntryForm
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </Modal.Content>
    </Modal>
  );
};

export default AddPatientEntryModal;
