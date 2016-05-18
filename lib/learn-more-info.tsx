import React = require('react');

import FriendlyDate from './friendly-date';
import AirportCode from './airport-code';
import {getEvents, getUniqueRepos, GithubRepo} from './github';
import * as Team from './team';

interface Props {
  person: Team.TeamMember;
}

interface State {
  repos: GithubRepo[]
}

export default class LearnMoreInfo extends React.Component<Props, State> {
  state = {
    repos: []
  };

  componentDidMount() {
    getEvents(this.props.person.github).then(events => {
      // TODO: Deal gracefully if we've already been unmounted.
      this.setState({
        repos: getUniqueRepos(events)
      });
    }).catch(e => {
      console.log(e);
    });
  }

  render() {
    let person = this.props.person;
    let name = person.first_name;
    let gitHubURL = "https://github.com/" + person.github;
    let bio = null;
    let repoInfo = null;

    if (this.state.repos.length) {
      repoInfo = (
        <div>
          <p>
            {name} has recently participated in the following projects
            on GitHub:
          </p>
          <ul>
            {this.state.repos.map(repo => {
              return (
                <li key={repo.name}>
                  <a href={"https://github.com/" + repo.name}
                     target="_blank">
                    {repo.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }

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
        {repoInfo}
        {bio}
        {this.props.children}
      </div>
    );
  }
}
