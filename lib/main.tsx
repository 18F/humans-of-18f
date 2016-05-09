import React = require('react');
import ReactDOM = require('react-dom');

interface Props {
}

interface State {
}

class App extends React.Component<Props, State> {
  render() {
    return <h1>Humans of 18F</h1>;
  }
}

function init() {
  ReactDOM.render(
    <App/>,
    document.getElementById('app')
  );
}

window.addEventListener('load', init, false);
