import React, { Component } from 'react';
import TableItem from './TableItem';

class ContactsTable extends Component {
  constructor(props) {
    super(props);
  }

  handleRemove(contact) {
    this.props.removeContact(contact);
  }

  renderList() {
    let data = this.props.data;
    let currLetter = '#';

    return (
      data.map((item, i) => {
          if (item.fullName.charAt(0).toLowerCase() != currLetter) {
            currLetter = item.fullName.charAt(0).toLowerCase();
            return (<li><li className="tableHeader">{currLetter.toUpperCase()}</li><TableItem remove={this.props.remove} key={i} item={item}/></li>)
          }
          return (<TableItem remove={this.props.remove} key={i} item={item}/>)
      })
    );
  }

  render(){
    return(
      <ul className="contactsTable">
      {this.renderList()}
      </ul>
    );
  }
}

export default ContactsTable;
