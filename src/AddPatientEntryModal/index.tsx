import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { NewEntry } from '../types';

import SelectTypeEntryForm from './SelectTypeEntryForm';

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
      centered={false}
      closeIcon
      open={modalOpen}
      onClose={onClose}
    >
      <Modal.Header>Add a new patient entry</Modal.Header>
      <Modal.Content scrolling>
        {error &&
         <Segment
           inverted
           color="red">{`Error: ${error}`}
         </Segment>}
        <SelectTypeEntryForm
          onSubmit={onSubmit}
          onCancel={onClose}
        />

      </Modal.Content>
    </Modal>
  );
};

export default AddPatientEntryModal;
