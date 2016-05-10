import React = require('react');
import ReactDOM = require('react-dom');

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
  currentMember?: Team.TeamMember,
  teamMembers?: Team.TeamMember[],
  currentChoices?: Team.TeamMember[],
  chosenChoices: boolean[]
}

class App extends React.Component<Props, State> {
  NUM_CHOICES = 4;

  state = {
    currentMember: null,
    teamMembers: [],
    currentChoices: [],
    chosenChoices: []
  };

  setNewQuestion(members: Team.TeamMember[], numChoices: number) {
    let member = Util.randomChoice(members);

    this.setState({
      teamMembers: members,
      currentMember: member,
      currentChoices: Util.multipleChoices(member, members, numChoices),
      chosenChoices: Util.filledArray(numChoices, false)
    });
  }

  componentDidMount() {
    // TODO: Deal with case where component is unmounted before
    // the promise is fulfilled.

    // TODO: Handle errors.
    Team.get().then((members) => {
      this.setNewQuestion(members, this.NUM_CHOICES);
    });
  }

  handleChoiceClick = (member, i) => {
    if (member === this.state.currentMember) {
      this.setNewQuestion(this.state.teamMembers, this.NUM_CHOICES);
    } else {
      let chosenChoices = this.state.chosenChoices.slice();
      chosenChoices[i] = true;
      this.setState({ chosenChoices: chosenChoices });
    }
  }

  render() {
    let content = <span>{"Loading\u2026"}</span>;

    if (this.state.currentMember) {
      content = (
        <div className="multiple-choice-question">
          <img src={this.state.currentMember.image}/>
          <p>Who is this human?</p>
          <div>
            {this.state.currentChoices.map((member, i) => {
              let hasBeenChosen = this.state.chosenChoices[i];
              let className = hasBeenChosen ? "usa-button-disabled"
                                            : "usa-button-primary-alt";

              return (
                <div className="button_wrapper">
                <button className={className} key={i} disabled={hasBeenChosen}
                        onClick={this.handleChoiceClick.bind(this, member, i)}>
                  {member.full_name}
                </button>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <div className="usa-grid">
        <div className="usa-grid-one-whole">
          <h1>Humans of 18F</h1>
          {content}
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
