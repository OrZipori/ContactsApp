using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json.Linq;
/// <summary>
/// Model class for ContactsApp.
/// </summary>
namespace contacts.Models
{
    public class Model
    {
        DbAgent db = DbAgent.Instance;

        public Model()
        {
            db.ConnString = "***";
        }

        public JArray FetchData()
        {
            JArray dt = db.PullData("SELECT * FROM Contacts ORDER BY fullName ASC");

            return dt;
        }

        public int AddContact(string name, string phone)
        {
            string query = string.Format("INSERT INTO Contacts output INSERTED.ID VALUES('{0}','{1}')", name, phone);
            int results = this.db.ExecuteWithResult(query);

            return results;
        }

        public string DeleteContact(int id)
        {
            string query = string.Format("DELETE FROM Contacts WHERE id = {0}", id);
            bool results = this.db.ExecuteNoResult(query);

            if (!results)
            {
                return "false";
            }

            return "true";
        }
    }
}
