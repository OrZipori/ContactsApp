 import React, { Component } from 'react';

 class SearchBar extends Component {
   constructor(props) {
     super(props);
   }

   handleSearch(event) {
     this.props.onSearch(event.target.value);
   }

   render() {
     return (
       <div className="searchBar">
         <input type="text" className="search"
          onChange={this.handleSearch.bind(this)} placeholder="Enter name or #phone number..."/>
       </div>
     );
   }
 }

 export default SearchBar;
