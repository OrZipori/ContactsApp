import React, { Component } from 'react';
import profile from '../imgs/profile.png';
import remove from '../imgs/remove.png';
import IconButton from './IconButton';

class TableItem extends Component {
  constructor(props) {
    super(props);
  }

  handleRemove() {
    this.props.remove(this.props.item);
  }

  render() {
    return (
      <li className="tableItem" key={this.props.key}>
         <div className="profilePicture">
            <img src={profile} alt="profile"/>
         </div>
         <div className="separator"></div>
         <div className="information">
           <span className="contactName">{this.props.item.fullName}</span>
           <span className="contactPhone">{this.props.item.phoneNumber}</span>
         </div>
         <div className="separator"></div>
         <div className="buttons">
            <IconButton className="removeIcon" imgUrl={remove} size={28} onClick={this.handleRemove.bind(this)} />
         </div>
      </li>
    );
  }
}

export default TableItem;
