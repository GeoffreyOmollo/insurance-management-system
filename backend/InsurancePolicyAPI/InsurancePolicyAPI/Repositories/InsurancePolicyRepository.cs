using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;
using InsurancePolicyAPI.Database;
using InsurancePolicyAPI.Models;

namespace InsurancePolicyAPI.Repositories
{
    public class InsurancePolicyRepository
    {
        private readonly DatabaseConnection _connection;

        public InsurancePolicyRepository(DatabaseConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<InsurancePolicy>> GetAllInsurancePoliciesAsync()
        {
            var query = "SELECT insurance_policy_id AS InsurancePolicyID, policy_holder AS PolicyHolder, insurance_type_id AS InsuranceTypeID, premium_amount AS PremiumAmount FROM tbl_insurance_policy";

            using (var connection = _connection.CreateConnection())
            {
                var policies = await connection.QueryAsync<InsurancePolicy>(query);
                return policies;
            }
        }

        public async Task<InsurancePolicy> GetInsurancePolicyByIdAsync(int id)
        {
            var query = "SELECT insurance_policy_id AS InsurancePolicyID, policy_holder AS PolicyHolder, insurance_type_id AS InsuranceTypeID, premium_amount AS PremiumAmount FROM tbl_insurance_policy WHERE insurance_policy_id = @Id";

            using (var connection = _connection.CreateConnection())
            {
                var policy = await connection.QuerySingleOrDefaultAsync<InsurancePolicy>(query, new { Id = id });
                return policy;
            }
        }

        public async Task<int> CreateInsurancePolicyAsync(InsurancePolicy insurancePolicy)
        {
            var query = @"INSERT INTO tbl_insurance_policy 
                          (policy_holder, insurance_type_id, premium_amount) 
                          VALUES (@PolicyHolder, @InsuranceTypeID, @PremiumAmount) 
                          RETURNING insurance_policy_id";

            using (var connection = _connection.CreateConnection())
            {
                var id = await connection.ExecuteScalarAsync<int>(query, insurancePolicy);
                return id;
            }
        }

        public async Task UpdateInsurancePolicyAsync(int id, InsurancePolicy insurancePolicy)
        {
            var query = @"UPDATE tbl_insurance_policy 
                          SET policy_holder = @PolicyHolder, 
                              insurance_type_id = @InsuranceTypeID, 
                              premium_amount = @PremiumAmount 
                          WHERE insurance_policy_id = @Id";

            using (var connection = _connection.CreateConnection())
            {
                await connection.ExecuteAsync(query, new
                {
                    insurancePolicy.PolicyHolder,
                    insurancePolicy.InsuranceTypeID,
                    insurancePolicy.PremiumAmount,
                    Id = id
                });
            }
        }

        public async Task DeleteInsurancePolicyAsync(int id)
        {
            var query = "DELETE FROM tbl_insurance_policy WHERE insurance_policy_id = @Id";

            using (var connection = _connection.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { Id = id });
            }
        }
    }
}
