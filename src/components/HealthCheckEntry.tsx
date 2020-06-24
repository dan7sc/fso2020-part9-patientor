import React from 'react';
import { Card, List, Icon, Grid, Header } from "semantic-ui-react";

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
          <Grid padded="horizontally">
            <Grid.Row>
              <Header as="h3" style={{ paddingTop: 3 }}>
                <Header.Content style={{ paddingRight: 10 }}>
                  {entry.date}
                </Header.Content>
                <Header.Content content={false}>
                  <Icon name="stethoscope" size="large" />
                </Header.Content>
              </Header>
            </Grid.Row>
          </Grid>
        </Card.Header>
        <Grid padded="vertically">
          <Card.Description>
            <Grid.Row>
              <i>{entry.description}</i>
            </Grid.Row>
            <Grid.Row>
              <Icon name="heart" color={ratingColor}></Icon>
            </Grid.Row>
            <Grid.Row>
              <List style={{ paddingTop: 8 }}>
                {entry.diagnosisCodes
                ? entry.diagnosisCodes.map(code => (
                  <List.Item style={{ padding: "5px 8px", opacity: .7 }} key={code}>
                    {code} - {diagnosis[code] ? diagnosis[code].name : ''}
                  </List.Item>
                ))
                : null}
              </List>
            </Grid.Row>
          </Card.Description>
        </Grid>
      </Card.Content>
    </Card>
  );
};

export default HealthCheckEntry;
