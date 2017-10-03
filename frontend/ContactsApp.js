/*
  ContactsApp
  Or Zipori
*/

import React, { Component } from 'react';
import './App.css';
import AppHeader from './Components/AppHeader';
import ContactsTable from './Components/ContactsTable';
import SearchBar from './Components/SearchBar';
import AddUserPopUp from './Components/AddUserPopUp';
import Loader from './imgs/loader.gif';

import DataService from './Services/DataService';

class ContactsApp extends Component {
  constructor(props) {
    super(props);

    // set api url for data service
    this.dataService = new DataService("http://orzipori.azurewebsites.net/api/Contacts/");

    this.state = {
      data: [],
      isLoading: false,
      showData: null,
      searchFault: false,
      popUp: false,
    }
  }

  // set the loader
  setLoading(loading) {
    this.setState({
      isLoading: loading
    });
  }

  // fetch data before mounting the component. react lifecycle method
  componentWillMount() {
    this.setLoading(true);
    let promise = this.dataService.fetchContacts();

    promise.then((result) => result.json())
    .then((result)=> {
      this.setState({
        showData: result,
        data: result
      });
      this.setLoading(false);
    })
    .catch((e) => alert("Error reading from server. Please try again " + e));
  }

  // private, reset the data for showing
  _reset() {
    this.setState({
      searchFault: false,
      showData: this.state.data,
    })
  }

  // toggle the pop up window
  togglePopUp() {
    this.setState({
      popUp: !this.state.popUp
    })
  }

  // handle local search instead of querying the api
  search(query) {
    if (query.length == 0) {
      this._reset();
      return;
    }

    let mode = (query.charAt(0) == "#") ? "phoneNumber" : "fullName";
    // if number so without '#'
    if (mode == "phoneNumber") {
      query = query.substring(1);
    }

    // so results with upper case will apear also
    query = query.toLowerCase();

    let filtered = this.state.data.filter((item) => {
      if (item[mode].toLowerCase().indexOf(query) !== -1) {
        return item;
      }
    });

    // update app state
    if (filtered.length > 0) {
      this.setState({
        searchFault: false,
        showData: filtered,
      });
    } else {
      this.setState({
        searchFault: true,
      });
    }
  }

  // private, hiding the popup. helper function
  _hidePopUp() {
    this.setState({popUp: false});
  }

  // add a new contact. locally and on the database
  addContact(contact) {
    let promise = this.dataService.addContact(contact);

    promise.then((result)=> result.json())
    .then((result) => {
      if (result.success == "true") {
        let data = this.state.data;

        // add the new id
        contact["id"] = result.id;

        // local addition
        let index = this._getIndexOfInserstion(contact.fullName);

        data.splice(index, 0, contact);

        this.setState({
          data: data,
          showData: data,
        });

        this._hidePopUp();
      } else {
        throw "err";
      }
    })
    .catch((e) => alert("Error adding contact"));
  }

  // remove the contact. locally and on the database
  removeContact(contact) {
    let promise = this.dataService.deleteContact(contact.id);

    promise.then((result) => result.json())
    .then((result) => {
      if (result.success == "true") {
        let data = this.state.data;
        let index = data.indexOf(contact);

        // local deletion
        if (index > -1) {
          data.splice(index, 1);
        }

        this.setState({
          data: data,
          showData: data,
        });
      } else {
        throw "err";
      }
    })
    .catch((e) => alert("Error removing contact"));
  }

  // private, get the correct index in the dataset for adding locally the new contact
  _getIndexOfInserstion(name) {
    let index = 0;
    let data = this.state.data;

    for (let i = 0; i < data.length; ++i) {
      if (data[i].fullName.toLowerCase() > name.toLowerCase()) {
        return i;
      }
    }

    // if all false then the new contact is at the last index
    return this.state.data.length;
  }

  // rendering the component
  render() {
    return (
      <div id="contactsApp">
        <div className="wrapper">
          <div id="appHeader">
            <AppHeader togglePopUp={this.togglePopUp.bind(this)}  />
            <SearchBar onSearch={this.search.bind(this)}/>
          </div>
        </div>
        {this.state.isLoading && <img src={Loader} alt="loading" className="loader" />}
        <div id="tableContainer">
          {this.state.searchFault && <h1 className="searchFault">No results matching your query</h1>}
          {!this.state.isLoading && !this.state.searchFault && <ContactsTable remove={this.removeContact.bind(this)} data={this.state.showData}/>}
        </div>
        {this.state.popUp && <AddUserPopUp onAdd={this.addContact.bind(this)} hide={this._hidePopUp.bind(this)} />}
      </div>
    );
  }
}

export default ContactsApp;
