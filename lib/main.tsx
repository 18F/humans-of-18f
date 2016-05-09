import React = require('react');
import ReactDOM = require('react-dom');

import * as Team from './team';

interface Props {
}

interface State {
  teamMembers: Team.TeamMember[]
}

class App extends React.Component<Props, State> {
  state = {
    teamMembers: []
  };
  componentDidMount() {
    // TODO: Deal with case where component is unmounted before
    // the promise is fulfilled.

    // TODO: Handle errors.
    Team.get().then((members) => {
      this.setState({
        teamMembers: members
      });
    });
  }
  render() {
    return (
      <div>
        <h1>Humans of 18F</h1>
        {this.state.teamMembers.map((member, i) => {
          return (
            <p key={i}>
              <img src={member.image}/>
              {member.full_name}
            </p>
          );
        })}
      </div>
    );
  }
}

function init() {
  ReactDOM.render(
    <App/>,
    document.getElementById('app')
  );
}

window.addEventListener('load', init, false);
