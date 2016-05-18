import React = require('react');

import ChromiumThrobber from './chromium-throbber.tsx';

interface Props {
  url: string
}

interface State {
  isLoading: boolean
}

export default class Avatar extends React.Component<Props, State> {
  state = {
    isLoading: true
  };

  handleAvatarLoad = () => {
    this.setState({ isLoading: false });
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.url !== this.props.url) {
      this.setState({ isLoading: true });
    }
  }

  render() {
    let className = "avatar-holder";

    if (this.state.isLoading) {
      className += " loading";
    }

    return (
      <div className={className}>
        {this.state.isLoading ? <ChromiumThrobber /> : null}
        <img src={this.props.url} onLoad={this.handleAvatarLoad} />
      </div>
    );
  }
}
