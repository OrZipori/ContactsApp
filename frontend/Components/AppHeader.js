import React, { Component } from 'react';
import IconButton from './IconButton';

import addIcon from '../imgs/add.png';

class AppHeader extends Component {
  constructor(props) {
    super(props);
  }

  handlePopUp() {
    this.props.togglePopUp();
  }

  render() {
    return (
      <div className="header">
         <span className="appTitle">Contacts</span>
         <IconButton className="addIcon" imgUrl={addIcon} size={36} onClick={this.handlePopUp.bind(this)} />
      </div>
    );
  }
}

export default AppHeader;
