using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;
using InsurancePolicyAPI.Database;
using InsurancePolicyAPI.Models;

namespace InsurancePolicyAPI.Repositories
{
    public class InsuranceTypeRepository
    {
        private readonly DatabaseConnection _connection;

        public InsuranceTypeRepository(DatabaseConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<InsuranceType>> GetAllInsuranceTypesAsync()
        {
            var query = "SELECT insurance_type_id AS InsuranceTypeID, insurance_description AS InsuranceDescription, deductible AS Deductible, policy_limit_amount AS PolicyLimitAmount, insurance_coverage_id AS InsuranceCoverageID, exclusion_id AS ExclusionID FROM tbl_insurance_type";

            using (var connection = _connection.CreateConnection())
            {
                var types = await connection.QueryAsync<InsuranceType>(query);
                return types;
            }
        }

        public async Task<InsuranceType> GetInsuranceTypeByIdAsync(int id)
        {
            var query = "SELECT insurance_type_id AS InsuranceTypeID, insurance_description AS InsuranceDescription, deductible AS Deductible, policy_limit_amount AS PolicyLimitAmount, insurance_coverage_id AS InsuranceCoverageID, exclusion_id AS ExclusionID FROM tbl_insurance_type WHERE insurance_type_id = @Id";

            using (var connection = _connection.CreateConnection())
            {
                var type = await connection.QuerySingleOrDefaultAsync<InsuranceType>(query, new { Id = id });
                return type;
            }
        }

        public async Task<int> CreateInsuranceTypeAsync(InsuranceType insuranceType)
        {
            var query = @"INSERT INTO tbl_insurance_type 
                          (insurance_description, deductible, policy_limit_amount, insurance_coverage_id, exclusion_id) 
                          VALUES (@InsuranceDescription, @Deductible, @PolicyLimitAmount, @InsuranceCoverageID, @ExclusionID) 
                          RETURNING insurance_type_id";

            using (var connection = _connection.CreateConnection())
            {
                var id = await connection.ExecuteScalarAsync<int>(query, insuranceType);
                return id;
            }
        }

        public async Task UpdateInsuranceTypeAsync(int id, InsuranceType insuranceType)
        {
            var query = @"UPDATE tbl_insurance_type 
                          SET insurance_description = @InsuranceDescription, 
                              deductible = @Deductible, 
                              policy_limit_amount = @PolicyLimitAmount, 
                              insurance_coverage_id = @InsuranceCoverageID, 
                              exclusion_id = @ExclusionID 
                          WHERE insurance_type_id = @Id";

            using (var connection = _connection.CreateConnection())
            {
                await connection.ExecuteAsync(query, new
                {
                    insuranceType.InsuranceDescription,
                    insuranceType.Deductible,
                    insuranceType.PolicyLimitAmount,
                    insuranceType.InsuranceCoverageID,
                    insuranceType.ExclusionID,
                    Id = id
                });
            }
        }

        public async Task DeleteInsuranceTypeAsync(int id)
        {
            var query = "DELETE FROM tbl_insurance_type WHERE insurance_type_id = @Id";

            using (var connection = _connection.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { Id = id });
            }
        }
    }
}
