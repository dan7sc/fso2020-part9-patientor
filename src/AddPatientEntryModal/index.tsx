import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddPatientEntryForm  from './AddPatientEntryForm';
import { NewEntry } from '../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
  error?: string;
}

const AddPatientEntryModal: React.FC<Props> = ({
  modalOpen,
  onClose,
  onSubmit,
  error
}) => {
  return (
    <Modal
      closeIcon
      open={modalOpen}
      onClose={onClose}
    >
      <Modal.Header>Add a new patient entry</Modal.Header>
      <Modal.Content>
        {error &&
         <Segment
           inverted
           color="red">{`Error: ${error}`}
         </Segment>}
        <AddPatientEntryForm
          onSubmit={onSubmit}
          onCancel={onClose}
        />

      </Modal.Content>
    </Modal>
  );
};

export default AddPatientEntryModal;
