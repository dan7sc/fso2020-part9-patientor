import React from 'react';
import { Card, List, Icon } from "semantic-ui-react";

import { useStateValue } from "../state";
import { Entry } from "../types";

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnosis },] = useStateValue();

  if (entry.type !== "Hospital") {
    return null;
  }

  return (
    <Card fluid raised key={entry.id}>
      <Card.Content>
        <Card.Header>
          <h3 style={{ float: 'left', paddingRight: 5 }}>
            {entry.date}
          </h3>
          <Icon name="medkit" size="large" />
        </Card.Header>
        <Card.Description>
          <i>{entry.description}</i>
          <List selection>
            {entry.diagnosisCodes
            ? entry.diagnosisCodes.map(code => (
              <List.Item key={code}>
                {code} - {diagnosis[code] ? diagnosis[code].name : ''}
              </List.Item>
            ))
            : null}
          </List>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default HospitalEntry;
