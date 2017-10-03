/*
  In charge of communicating with the API.
*/
class DataService {

  constructor(api) {
    this.apiUrl = api;
  }

  fetchContacts() {
    return fetch(this.apiUrl + "fetch");
  }

  addContact(contact) {
    return fetch(this.apiUrl + "addContact", {
      method: 'POST',
      body: JSON.stringify(contact),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    });
  }

  deleteContact(id) {
    return fetch(this.apiUrl + "deleteContact/" + id);
  }
}

export default DataService;
