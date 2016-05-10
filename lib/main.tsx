import React = require('react');
import ReactDOM = require('react-dom');

import MultipleChoices from './multiple-choices';
import * as Util from './util';
import * as Team from './team';

interface Props {
}

// Ugh, in practice, not all of these are truly optional, but we need
// to declare them as such in order to actually use setState() without
// ridiculous amounts of repetition.
//
// https://github.com/DefinitelyTyped/DefinitelyTyped/pull/4809
interface State {
  teamMembers?: Team.TeamMember[],
  currentMember?: Team.TeamMember
}

class App extends React.Component<Props, State> {
  NUM_CHOICES = 4;

  state = {
    teamMembers: [],
    currentMember: null
  };

  setNewQuestion(members: Team.TeamMember[]) {
    this.setState({ currentMember: Util.randomChoice(members) });
  }

  handleCorrectAnswerChosen = () => {
    let members = Util.without(this.state.teamMembers,
                               this.state.currentMember);
    this.setNewQuestion(members);
  }

  componentDidMount() {
    // TODO: Deal with case where component is unmounted before
    // the promise is fulfilled.

    // TODO: Handle errors.
    Team.get().then((members) => {
      this.setState({ teamMembers: members });
      this.setNewQuestion(members);
    });
  }

  render() {
    let content = <span>{"Loading\u2026"}</span>;

    if (this.state.currentMember) {
      content = <MultipleChoices
        teamMembers={this.state.teamMembers}
        currentMember={this.state.currentMember}
        numChoices={this.NUM_CHOICES}
        onCorrectAnswerChosen={this.handleCorrectAnswerChosen}
      />;
    }

    return (
      <div>
        <div className="usa-grid">
          <div className="usa-width-one-whole">
            <h1>Humans of 18F</h1>
          </div>
        </div>
        <div className="usa-grid">
          <div className="usa-width-one-third">&nbsp;</div>
          <div className="usa-width-one-third">
            {content}
          </div>
          <div className="usa-width-one-third">&nbsp;</div>
        </div>
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
