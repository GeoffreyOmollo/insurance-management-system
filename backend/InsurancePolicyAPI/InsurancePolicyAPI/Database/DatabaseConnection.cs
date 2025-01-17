using System.Data;
using Npgsql;

namespace InsurancePolicyAPI.Database
{
    public class DatabaseConnection
    {
        private readonly string _connectionString;

        public DatabaseConnection(string connectionString)
        {
            _connectionString = connectionString;
        }

        public IDbConnection CreateConnection() => new NpgsqlConnection(_connectionString);
    }
}
