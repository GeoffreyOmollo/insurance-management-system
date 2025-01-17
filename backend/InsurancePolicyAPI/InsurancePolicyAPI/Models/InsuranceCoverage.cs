using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InsurancePolicyAPI.Models
{
    public class InsuranceCoverage
    {
        [Key]
        [Column("insurance_coverage_id")]
        public int InsuranceCoverageID { get; set; }

        [Column("coverage_description")]
        [Required]
        public string CoverageDescription { get; set; } = string.Empty;
    }
}