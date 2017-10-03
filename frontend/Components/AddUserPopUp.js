import React, { Component } from 'react';
import IconButton from './IconButton';
import removeIcon from '../imgs/remove.png';

class AddUserPopUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      tel: '',
      error: []
    }
  }

  handleAdd(event) {
    event.preventDefault();
    let errors = [];
    if (this.state.name.length == 0) {
      errors.push("Must enter a name");
    }

    if (!(/^[0-9]+$/.test(this.state.tel))) {
      errors.push("Must enter a valid phone number");
    }

    if (errors.length > 0) {
      this.setState({
        error: errors,
      })
      return;
    }

    this.props.onAdd({
      fullName: this.state.name,
      phoneNumber: this.state.tel
    });
  }

  handleInput(event) {
    let name = event.target.name;

    this.setState({
      [name]: event.target.value,
    })
  }

  hide() {
    this.props.hide();
  }

  render() {
    let pos = (window.innerWidth/2) - (window.innerWidth * 0.4)/3;
    let error = (this.state.error.length > 0) ? 'block' : 'none';

    return (
      <div className="addUserPopUp" style={{left: pos}}>
        <span className="popUpHeader">Add new contact<IconButton className="popUpExit" imgUrl={removeIcon} size={24} onClick={this.hide.bind(this)} /></span>
        <form onSubmit={this.handleAdd.bind(this)}>
          <input className="inputPopUp" onChange={this.handleInput.bind(this)}
           type="text" name="name" placeholder="enter valid name"/>
          <input className="inputPopUp" onChange={this.handleInput.bind(this)}
           type="tel" name="tel" placeholder="enter valid number"/>
          <input type="submit" value="Add" />
          <input type="reset" value="Reset" />
        </form>
        <ul className="error" style={{display: error}}>
          {this.state.error.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>
    );
  }
}

export default AddUserPopUp;
