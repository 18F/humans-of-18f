import React = require('react');

import * as Util from './util';
import * as Team from './team';

import LearnMoreInfo from './learn-more-info';
import FriendlyDate from './friendly-date';
import AirportCode from './airport-code';
import Avatar from './avatar';

interface Props {
  answer: Team.TeamMember,
  choicePool: Team.TeamMember[],
  numChoices: number,
  onCorrectAnswerChosen: () => void
}

interface State {
  currentChoices?: Team.TeamMember[],
  chosenChoices?: boolean[],
  isLearningMore?: boolean
}

function chooseMany<T>(answer: T, choicePool: T[], numChoices: number): T[] {
  let choices = new Array(numChoices);

  choices[Util.randomIndex(choices)] = answer;

  choicePool = Util.without(choicePool, answer);

  for (let i = 0; i < numChoices; i++) {
    if (choices[i] === answer) {
      continue;
    }

    choices[i] = Util.randomChoice(choicePool);

    choicePool = Util.without(choicePool, choices[i]);
  }

  return choices;
}

export default class MultipleChoices extends React.Component<Props, State> {
  state = {
    currentChoices: [],
    chosenChoices: [],
    isLearningMore: false
  };

  handleLearnMoreClick = () => {
    this.setState({ isLearningMore: true });
  }

  handleChoiceClick = (member, i) => {
    if (member === this.props.answer) {
      this.props.onCorrectAnswerChosen();
    } else {
      let chosenChoices = this.state.chosenChoices.slice();
      chosenChoices[i] = true;
      this.setState({ chosenChoices: chosenChoices });
    }
  }

  resetState(props: Props) {
    this.setState({
      currentChoices: chooseMany(
        props.answer,
        props.choicePool,
        props.numChoices
      ),
      chosenChoices: Util.filledArray(this.props.numChoices, false),
      isLearningMore: false
    });
  }

  componentWillMount() {
    this.resetState(this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.answer !== this.props.answer) {
      this.resetState(nextProps);
    }
  }

  render() {
    let answer = this.props.answer;
    let pifInfo = null;
    let content = null;

    if (answer.pif_round) {
      pifInfo = (
        <p>
          <small>
            Disclaimer: This person is, or has once been, a <abbr
            title="Presidential Innovation Fellow">PIF</abbr>, and may not
            actually be part of 18F.
          </small>
        </p>
      );
    }

    if (this.state.isLearningMore) {
      content = (
        <LearnMoreInfo person={answer}>
          <div className="button_wrapper">
            <button className="usa-button-primary"
                    onClick={this.props.onCorrectAnswerChosen}>
              Continue
            </button>
          </div>
        </LearnMoreInfo>
      );
    } else {
      content = (
        <div>
          <p>
            Who is this human
            from <AirportCode airport={answer.location} /> who joined
            in <FriendlyDate date={answer.start_date} />?
          </p>
          <div>
            {this.state.currentChoices.map((member, i) => {
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
          <div className="button_wrapper">
            <button className="usa-button-outline"
                    onClick={this.handleLearnMoreClick}>
              Give up and learn more about this human
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="multiple-choice-question">
        <Avatar url={answer.image} />
        {content}
        {pifInfo}
      </div>
    );
  }
}
