import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './ProgressBar.css';

class ProgressBar extends Component {

  render() {
    var style = {
    //   width: (this.state.progress*100 + "%")
      width: (this.props.progress*100 + "%")
    };

    return (
      <div className="progress" id={this.props.id}>
        <div className="progress__bar" style={style}></div>
      </div>
    );
  }
}

export default ProgressBar;
