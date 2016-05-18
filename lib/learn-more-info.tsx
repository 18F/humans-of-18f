import React = require('react');

import FriendlyDate from './friendly-date';
import AirportCode from './airport-code';
import * as Team from './team';

interface Props {
  person: Team.TeamMember;
}

interface State {
}

export default class LearnMoreInfo extends React.Component<Props, State> {
  render() {
    let person = this.props.person;
    let name = person.first_name;
    let gitHubURL = "https://github.com/" + person.github;
    let bio = null;

    if (person.bio) {
      bio = <p>{person.bio}</p>;
    }

    return (
      <div className="learn-more">
        <h2>{person.full_name}</h2>
        <p>
          This human is
          from <AirportCode airport={person.location} /> and joined
          in <FriendlyDate date={person.start_date} />.
        </p>
        <p>{name} is <a href={gitHubURL}
                        target="_blank">@{person.github}</a> on GitHub.
        </p>
        {bio}
        {this.props.children}
      </div>
    );
  }
}
