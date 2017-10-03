import React, { Component } from 'react';

class IconButton extends Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    this.props.onClick();
  }

  render() {
    let style = {
      width: this.props.size + 'px',
      height: this.props.size + 'px'
    };
    return (
      <a className={["iconButton" ,this.props.className].join(' ')} onClick={() => this.handleClick()}>
        <img src={this.props.imgUrl} style={style} />
      </a>
    );
  }
}

export default IconButton;
