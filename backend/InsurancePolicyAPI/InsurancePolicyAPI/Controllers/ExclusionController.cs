using InsurancePolicyAPI.Models;
using InsurancePolicyAPI.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace InsurancePolicyAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExclusionsController : ControllerBase
    {
        private readonly ExclusionRepository _exclusionRepository;

        public ExclusionsController(ExclusionRepository exclusionRepository)
        {
            _exclusionRepository = exclusionRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<Exclusion>>> GetExclusions()
        {
            var exclusions = await _exclusionRepository.GetAllExclusionsAsync();
            return Ok(exclusions);
        }

        [HttpGet("{exclusionId}")]
        public async Task<ActionResult<Exclusion>> GetExclusion(int exclusionId)
        {
            var exclusion = await _exclusionRepository.GetExclusionByIdAsync(exclusionId);

            if (exclusion == null)
                return NotFound(new { Message = "Exclusion not found" });

            return Ok(exclusion);
        }

        [HttpPost]
        public async Task<ActionResult<Exclusion>> CreateExclusion(Exclusion exclusion)
        {
            var id = await _exclusionRepository.CreateExclusionAsync(exclusion);
            return CreatedAtAction(nameof(GetExclusion), new { exclusionId = id }, exclusion);
        }

        [HttpPut("{exclusionId}")]
        public async Task<ActionResult> UpdateExclusion(int exclusionId, Exclusion exclusion)
        {
            var existingExclusion = await _exclusionRepository.GetExclusionByIdAsync(exclusionId);

            if (existingExclusion == null)
                return NotFound(new { Message = "Exclusion not found" });

            await _exclusionRepository.UpdateExclusionAsync(exclusionId, exclusion);
            return NoContent();
        }

        [HttpDelete("{exclusionId}")]
        public async Task<ActionResult> DeleteExclusion(int exclusionId)
        {
            var existingExclusion = await _exclusionRepository.GetExclusionByIdAsync(exclusionId);

            if (existingExclusion == null)
                return NotFound(new { Message = "Exclusion not found" });

            await _exclusionRepository.DeleteExclusionAsync(exclusionId);
            return NoContent();
        }
    }
}
