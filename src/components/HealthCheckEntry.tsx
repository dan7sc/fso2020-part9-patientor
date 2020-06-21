import React from 'react';
import { Card, List, Icon } from "semantic-ui-react";

import { useStateValue } from "../state";
import { Entry } from "../types";

type Color = "green" | "yellow" | "orange" | "red" | undefined;

const HealthCheckEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnosis },] = useStateValue();

  if (entry.type !== "HealthCheck") {
    return null;
  }

  let ratingColor: Color;

  if (entry.healthCheckRating || entry.healthCheckRating === 0) {
    if (entry.healthCheckRating === 0) {
      ratingColor = "green";
    } else if (entry.healthCheckRating === 1) {
      ratingColor = "yellow";
    } else if (entry.healthCheckRating === 2) {
      ratingColor = "orange";
    } else {
      ratingColor = "red";
    }
  }

  return (
    <Card fluid raised key={entry.id}>
      <Card.Content>
        <Card.Header>
          <h3 style={{ float: 'left', paddingRight: 5 }}>
            {entry.date}
          </h3>
          <Icon name="doctor" size="large" />
        </Card.Header>
        <Card.Description>
          <i>{entry.description}</i>
          <p>
            <Icon name="heart" color={ratingColor}></Icon>
          </p>
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

export default HealthCheckEntry;
