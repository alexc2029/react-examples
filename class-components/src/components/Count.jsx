import { Component } from 'react';

class Count extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <span>{this.props.count}</span>;
  }
}

export default Count;
