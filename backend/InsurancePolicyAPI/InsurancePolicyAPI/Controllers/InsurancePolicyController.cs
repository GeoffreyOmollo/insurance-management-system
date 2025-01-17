using InsurancePolicyAPI.Models;
using InsurancePolicyAPI.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace InsurancePolicyAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InsurancePolicyController : ControllerBase
    {
        private readonly InsurancePolicyRepository _insurancePolicyRepository;

        public InsurancePolicyController(InsurancePolicyRepository insurancePolicyRepository)
        {
            _insurancePolicyRepository = insurancePolicyRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<InsurancePolicy>>> GetInsurancePolicies()
        {
            var policies = await _insurancePolicyRepository.GetAllInsurancePoliciesAsync();
            return Ok(policies);
        }

        [HttpGet("{insurancePolicyId}")]
        public async Task<ActionResult<InsurancePolicy>> GetInsurancePolicy(int insurancePolicyId)
        {
            var policy = await _insurancePolicyRepository.GetInsurancePolicyByIdAsync(insurancePolicyId);

            if (policy == null)
                return NotFound(new { Message = "Insurance policy not found" });

            return Ok(policy);
        }

        [HttpPost]
        public async Task<ActionResult<InsurancePolicy>> CreateInsurancePolicy(InsurancePolicy insurancePolicy)
        {
            var id = await _insurancePolicyRepository.CreateInsurancePolicyAsync(insurancePolicy);
            return CreatedAtAction(nameof(GetInsurancePolicy), new { insurancePolicyId = id }, insurancePolicy);
        }

        [HttpPut("{insurancePolicyId}")]
        public async Task<ActionResult> UpdateInsurancePolicy(int insurancePolicyId, InsurancePolicy insurancePolicy)
        {
            var existingPolicy = await _insurancePolicyRepository.GetInsurancePolicyByIdAsync(insurancePolicyId);

            if (existingPolicy == null)
                return NotFound(new { Message = "Insurance policy not found" });

            await _insurancePolicyRepository.UpdateInsurancePolicyAsync(insurancePolicyId, insurancePolicy);
            return NoContent();
        }

        [HttpDelete("{insurancePolicyId}")]
        public async Task<ActionResult> DeleteInsurancePolicy(int insurancePolicyId)
        {
            var existingPolicy = await _insurancePolicyRepository.GetInsurancePolicyByIdAsync(insurancePolicyId);

            if (existingPolicy == null)
                return NotFound(new { Message = "Insurance policy not found" });

            await _insurancePolicyRepository.DeleteInsurancePolicyAsync(insurancePolicyId);
            return NoContent();
        }
    }
}
