using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using contacts.Models;
using System.Web.Http;


namespace contacts.Controllers
{
    /// <summary>
    /// Main Controller.
    /// </summary>
    public class ContactsController : ApiController
    {
        private Model model;

        public class Contact
        {
            public string fullName { get; set; }
            public string phoneNumber { get; set; }
        }

        public ContactsController()
        {
            this.model = new Model();
        }

        // GET: api/Contacts
        [HttpGet()]
        [Route("api/Contacts/fetch")]
        public IHttpActionResult fetch()
        {
            return Ok(this.model.FetchData());
        }

        // POST: api/Contacts
        [HttpPost()]
        [Route("api/Contacts/addContact")]
        public IHttpActionResult addContact(Contact contact)
        {
            int id = this.model.AddContact(contact.fullName, contact.phoneNumber);
            string results = (id > 0) ? "true" : "false";
            return Ok(new {success = results, id = id});
        }

        // DELETE: api/Contacts/5
        [HttpGet()]
        [Route("api/Contacts/deleteContact/{id}")]
        public IHttpActionResult deleteContact(int id)
        {
            return Ok(new { success = this.model.DeleteContact(id) });
        }
    }
}
