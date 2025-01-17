using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;
using InsurancePolicyAPI.Database;
using InsurancePolicyAPI.Models;

namespace InsurancePolicyAPI.Repositories
{
    public class InsuranceCoverageRepository
    {
        private readonly DatabaseConnection _connection;

        public InsuranceCoverageRepository(DatabaseConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<InsuranceCoverage>> GetAllInsuranceCoveragesAsync()
        {
            var query = "SELECT insurance_coverage_id AS InsuranceCoverageID, coverage_description AS CoverageDescription FROM tbl_insurance_coverage";

            using (var connection = _connection.CreateConnection())
            {
                var coverages = await connection.QueryAsync<InsuranceCoverage>(query);
                return coverages;
            }
        }

        public async Task<InsuranceCoverage?> GetInsuranceCoverageByIdAsync(int id)
        {
            var query = "SELECT insurance_coverage_id AS InsuranceCoverageID, coverage_description AS CoverageDescription FROM tbl_insurance_coverage WHERE insurance_coverage_id = @Id";

            using (var connection = _connection.CreateConnection())
            {
                var coverage = await connection.QuerySingleOrDefaultAsync<InsuranceCoverage>(query, new { Id = id });
                return coverage;
            }
        }

        public async Task<int> CreateInsuranceCoverageAsync(InsuranceCoverage insuranceCoverage)
        {
            var query = "INSERT INTO tbl_insurance_coverage (coverage_description) VALUES (@CoverageDescription) RETURNING insurance_coverage_id";

            using (var connection = _connection.CreateConnection())
            {
                var id = await connection.ExecuteScalarAsync<int>(query, insuranceCoverage);
                return id;
            }
        }

        public async Task UpdateInsuranceCoverageAsync(int id, InsuranceCoverage insuranceCoverage)
        {
            var query = "UPDATE tbl_insurance_coverage SET coverage_description = @CoverageDescription WHERE insurance_coverage_id = @Id";

            using (var connection = _connection.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { insuranceCoverage.CoverageDescription, Id = id });
            }
        }

        public async Task DeleteInsuranceCoverageAsync(int id)
        {
            var query = "DELETE FROM tbl_insurance_coverage WHERE insurance_coverage_id = @Id";

            using (var connection = _connection.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { Id = id });
            }
        }
    }
}
