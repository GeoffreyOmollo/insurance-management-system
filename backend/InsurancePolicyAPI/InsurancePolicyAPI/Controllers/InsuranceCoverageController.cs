using InsurancePolicyAPI.Models;
using InsurancePolicyAPI.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace InsurancePolicyAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InsuranceCoverageController : ControllerBase
    {
        private readonly InsuranceCoverageRepository _insuranceCoverageRepository;

        public InsuranceCoverageController(InsuranceCoverageRepository insuranceCoverageRepository)
        {
            _insuranceCoverageRepository = insuranceCoverageRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<InsuranceCoverage>>> GetInsuranceCoverages()
        {
            var coverages = await _insuranceCoverageRepository.GetAllInsuranceCoveragesAsync();
            return Ok(coverages);
        }

        [HttpGet("{insuranceCoverageId}")]
        public async Task<ActionResult<InsuranceCoverage>> GetInsuranceCoverage(int insuranceCoverageId)
        {
            var coverage = await _insuranceCoverageRepository.GetInsuranceCoverageByIdAsync(insuranceCoverageId);

            if (coverage == null)
                return NotFound(new { Message = "Insurance coverage not found" });

            return Ok(coverage);
        }

        [HttpPost]
        public async Task<ActionResult<InsuranceCoverage>> CreateInsuranceCoverage(InsuranceCoverage insuranceCoverage)
        {
            var id = await _insuranceCoverageRepository.CreateInsuranceCoverageAsync(insuranceCoverage);
            return CreatedAtAction(nameof(GetInsuranceCoverage), new { insuranceCoverageId = id }, insuranceCoverage);
        }

        [HttpPut("{insuranceCoverageId}")]
        public async Task<ActionResult> UpdateInsuranceCoverage(int insuranceCoverageId, InsuranceCoverage insuranceCoverage)
        {
            var existingCoverage = await _insuranceCoverageRepository.GetInsuranceCoverageByIdAsync(insuranceCoverageId);

            if (existingCoverage == null)
                return NotFound(new { Message = "Insurance coverage not found" });

            await _insuranceCoverageRepository.UpdateInsuranceCoverageAsync(insuranceCoverageId, insuranceCoverage);
            return NoContent();
        }

        [HttpDelete("{insuranceCoverageId}")]
        public async Task<ActionResult> DeleteInsuranceCoverage(int insuranceCoverageId)
        {
            var existingCoverage = await _insuranceCoverageRepository.GetInsuranceCoverageByIdAsync(insuranceCoverageId);

            if (existingCoverage == null)
                return NotFound(new { Message = "Insurance coverage not found" });

            await _insuranceCoverageRepository.DeleteInsuranceCoverageAsync(insuranceCoverageId);
            return NoContent();
        }
    }
}
