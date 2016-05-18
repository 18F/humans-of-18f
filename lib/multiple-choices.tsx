import React = require('react');

import * as Util from './util';
import * as Team from './team';

import ChromiumThrobber from './chromium-throbber.tsx';

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

interface Props {
  answer: Team.TeamMember,
  choicePool: Team.TeamMember[],
  numChoices: number,
  onCorrectAnswerChosen: () => void
}

interface State {
  currentChoices?: Team.TeamMember[],
  chosenChoices?: boolean[],
  isLearningMore?: boolean,
  isAvatarLoading?: boolean
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
    isLearningMore: false,
    isAvatarLoading: true
  };

  handleAvatarLoad = () => {
    this.setState({ isAvatarLoading: false });
  }

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
      isLearningMore: false,
      isAvatarLoading: true
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
    let location = (
      <a href={"https://duckduckgo.com/?q=" +
               encodeURIComponent(answer.location) +
               "+airport&ia=about"}
         target="_blank">{answer.location}</a>
    );
    let startDate = MONTHS[answer.start_date.getMonth()] + " " +
                    answer.start_date.getFullYear();
    let pifInfo = null;
    let content = null;
    let avatarHolderClassName = "avatar-holder";

    if (this.state.isAvatarLoading) {
      avatarHolderClassName += " loading";
    }

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
      let name = answer.first_name;
      let gitHubURL = "https://github.com/" + answer.github;
      let bio = null;

      if (answer.bio) {
        bio = <p>{answer.bio}</p>;
      }

      content = (
        <div className="learn-more">
          <h2>{answer.full_name}</h2>
          <p>This human is from {location} and joined in {startDate}.</p>
          <p>{name} is <a href={gitHubURL}
                          target="_blank">@{answer.github}</a> on GitHub.
          </p>
          {bio}
          <div className="button_wrapper">
            <button className="usa-button-primary"
                    onClick={this.props.onCorrectAnswerChosen}>
              Continue
            </button>
          </div>
        </div>
      );
    } else {
      content = (
        <div>
          <p>Who is this human from {location} who joined in {startDate}?</p>
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
        <div className={avatarHolderClassName}>
          {this.state.isAvatarLoading ? <ChromiumThrobber /> : null}
          <img src={answer.image} onLoad={this.handleAvatarLoad} />
        </div>
        {content}
        {pifInfo}
      </div>
    );
  }
}
