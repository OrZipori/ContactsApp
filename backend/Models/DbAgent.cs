using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json.Linq;

namespace contacts.Models
{
    /// <summary>
    /// Database agent for ContactsApp.
    /// </summary>
    public class DbAgent
    {
        private static readonly DbAgent instance = new DbAgent();
        private DataTable data;
        private string connString;

        static DbAgent()
        {
        }

        private DbAgent()
        {
            this.data = new DataTable();
        }

        public static DbAgent Instance
        {
            get
            {
                return instance;
            }
        }

        public string ConnString { set { this.connString = value; } }

        public int ExecuteWithResult(string query)
        {
            using (var connection = new SqlConnection(this.connString))
            using (var command = new SqlCommand())
            {
                command.Connection = connection;
                command.CommandText = query;

                if (connection.State != ConnectionState.Open)
                {
                    connection.Open();
                }

                try
                {
                    // we we'll get the new id
                    var results = command.ExecuteScalar();

                    return (int) results;
                }
                catch (SqlException)
                {
                    return -1;
                }
            }
        }

        public bool ExecuteNoResult(string query)
        {
            using (var connection = new SqlConnection(this.connString))
            using (var command = new SqlCommand())
            {
                command.Connection = connection;
                command.CommandText = query;

                if (connection.State != ConnectionState.Open)
                {
                    connection.Open();
                }

                // run command that we don't expect output from
                int results;
                try
                {
                    results = command.ExecuteNonQuery();
                    // error == no affected rows
                    if (results < 1)
                    {
                        return false;
                    }
                }
                catch (SqlException)
                {
                    return false;
                }

                // successful query
                return true;
            }
        }

        public JArray PullData(string query)
        {
            using (var connection = new SqlConnection(this.connString))
            using (var command = new SqlCommand())
            {
                command.Connection = connection;
                command.CommandText = query;
                command.CommandType = CommandType.Text;

                if (connection.State != ConnectionState.Open)
                {
                    connection.Open();
                }

                SqlDataReader reader;
                try
                {
                    reader = command.ExecuteReader();
                }
                catch (SqlException)
                {
                    return null;
                }

                JArray results = new JArray();
                while (reader.Read())
                {
                    JObject row = new JObject();
                    for (int i = 0; i < reader.FieldCount; ++i)
                    {
                        row[reader.GetName(i).ToString()] = reader[i].ToString();
                    }

                    results.Add(row);
                }

                return results;
            }
        }
    }
}