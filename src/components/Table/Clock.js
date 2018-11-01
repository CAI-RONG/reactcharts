import React from "react";


class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
    
  }

  // 掛載函數
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  // 卸載函數
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <p>{this.state.date.getMonth()}月份</p>
      </div>
    );
  }
}

export default Clock;