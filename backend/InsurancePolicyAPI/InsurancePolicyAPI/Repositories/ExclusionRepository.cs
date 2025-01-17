using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;
using InsurancePolicyAPI.Database;
using InsurancePolicyAPI.Models;

namespace InsurancePolicyAPI.Repositories
{
    public class ExclusionRepository
    {
        private readonly DatabaseConnection _connection;

        public ExclusionRepository(DatabaseConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<Exclusion>> GetAllExclusionsAsync()
        {
            var query = "SELECT exclusion_id AS ExclusionID, exclusion_description AS ExclusionDescription FROM tbl_exclusion";

            using (var connection = _connection.CreateConnection())
            {
                var exclusions = await connection.QueryAsync<Exclusion>(query);
                return exclusions;
            }
        }

        public async Task<Exclusion?> GetExclusionByIdAsync(int id)
        {
            var query = "SELECT exclusion_id AS ExclusionID, exclusion_description AS ExclusionDescription FROM tbl_exclusion WHERE exclusion_id = @Id";

            using (var connection = _connection.CreateConnection())
            {
                var exclusion = await connection.QuerySingleOrDefaultAsync<Exclusion>(query, new { Id = id });
                return exclusion;
            }
        }

        public async Task<int> CreateExclusionAsync(Exclusion exclusion)
        {
            var query = "INSERT INTO tbl_exclusion (exclusion_description) VALUES (@ExclusionDescription) RETURNING exclusion_id";

            using (var connection = _connection.CreateConnection())
            {
                var id = await connection.ExecuteScalarAsync<int>(query, exclusion);
                return id;
            }
        }

        public async Task UpdateExclusionAsync(int id, Exclusion exclusion)
        {
            var query = "UPDATE tbl_exclusion SET exclusion_description = @ExclusionDescription WHERE exclusion_id = @Id";

            using (var connection = _connection.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { exclusion.ExclusionDescription, Id = id });
            }
        }

        public async Task DeleteExclusionAsync(int id)
        {
            var query = "DELETE FROM tbl_exclusion WHERE exclusion_id = @Id";

            using (var connection = _connection.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { Id = id });
            }
        }
    }
}
