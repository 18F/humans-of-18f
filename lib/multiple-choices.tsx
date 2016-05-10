import React = require('react');

import * as Util from './util';
import * as Team from './team';

interface Props {
  currentMember: Team.TeamMember,
  teamMembers: Team.TeamMember[],
  currentChoices: Team.TeamMember[],
  onCorrectAnswerChosen: () => void
}

interface State {
  chosenChoices: boolean[]
}

export default class MultipleChoices extends React.Component<Props, State> {
  state = {
    chosenChoices: []
  };

  handleChoiceClick = (member, i) => {
    if (member === this.props.currentMember) {
      this.props.onCorrectAnswerChosen();
    } else {
      let chosenChoices = this.state.chosenChoices.slice();
      chosenChoices[i] = true;
      this.setState({ chosenChoices: chosenChoices });
    }
  }

  resetState() {
    let numChoices = this.props.currentChoices.length;

    this.setState({
      chosenChoices: Util.filledArray(numChoices, false)
    });
  }

  componentWillMount() {
    this.resetState();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.currentMember !== this.props.currentMember) {
      this.resetState();
    }
  }

  render() {
    return (
      <div className="multiple-choice-question">
        <img className="portrait" src={this.props.currentMember.image}/>
        <p>Who is this human?</p>
        <div>
          {this.props.currentChoices.map((member, i) => {
            let hasBeenChosen = this.state.chosenChoices[i];
            let className = hasBeenChosen ? "usa-button-disabled"
                                          : "usa-button-primary-alt";

            return (
              <div className="button_wrapper" key={i}>
                <button className={className} disabled={hasBeenChosen}
                  onClick={this.handleChoiceClick.bind(this, member, i) }>
                  {member.full_name}
                </button>
              </div>
            );
          }) }
        </div>
      </div>
    );
  }
}
