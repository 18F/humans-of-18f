import React = require('react');

import * as Team from './team';

interface Props {
  person: Team.TeamMember
}

interface State {
}

export default class Profile extends React.Component<Props, State> {
  render() {
    let person = this.props.person;

    return (
      <div>
        <h2>{person.full_name}</h2>
      </div>
    );
  }
}
