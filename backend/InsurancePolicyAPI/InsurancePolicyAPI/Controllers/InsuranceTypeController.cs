using InsurancePolicyAPI.Models;
using InsurancePolicyAPI.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace InsurancePolicyAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InsuranceTypeController : ControllerBase
    {
        private readonly InsuranceTypeRepository _insuranceTypeRepository;

        public InsuranceTypeController(InsuranceTypeRepository insuranceTypeRepository)
        {
            _insuranceTypeRepository = insuranceTypeRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<InsuranceType>>> GetInsuranceTypes()
        {
            var types = await _insuranceTypeRepository.GetAllInsuranceTypesAsync();
            return Ok(types);
        }

        [HttpGet("{insuranceTypeId}")]
        public async Task<ActionResult<InsuranceType>> GetInsuranceType(int insuranceTypeId)
        {
            var type = await _insuranceTypeRepository.GetInsuranceTypeByIdAsync(insuranceTypeId);

            if (type == null)
                return NotFound(new { Message = "Insurance type not found" });

            return Ok(type);
        }

        [HttpPost]
        public async Task<ActionResult<InsuranceType>> CreateInsuranceType(InsuranceType insuranceType)
        {
            var id = await _insuranceTypeRepository.CreateInsuranceTypeAsync(insuranceType);
            return CreatedAtAction(nameof(GetInsuranceType), new { insuranceTypeId = id }, insuranceType);
        }

        [HttpPut("{insuranceTypeId}")]
        public async Task<ActionResult> UpdateInsuranceType(int insuranceTypeId, InsuranceType insuranceType)
        {
            var existingType = await _insuranceTypeRepository.GetInsuranceTypeByIdAsync(insuranceTypeId);

            if (existingType == null)
                return NotFound(new { Message = "Insurance type not found" });

            await _insuranceTypeRepository.UpdateInsuranceTypeAsync(insuranceTypeId, insuranceType);
            return NoContent();
        }

        [HttpDelete("{insuranceTypeId}")]
        public async Task<ActionResult> DeleteInsuranceType(int insuranceTypeId)
        {
            var existingType = await _insuranceTypeRepository.GetInsuranceTypeByIdAsync(insuranceTypeId);

            if (existingType == null)
                return NotFound(new { Message = "Insurance type not found" });

            await _insuranceTypeRepository.DeleteInsuranceTypeAsync(insuranceTypeId);
            return NoContent();
        }
    }
}
