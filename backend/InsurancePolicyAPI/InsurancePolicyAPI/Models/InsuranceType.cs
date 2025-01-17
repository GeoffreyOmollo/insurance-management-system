using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InsurancePolicyAPI.Models
{
    public class InsuranceType
    {

        [Key]
        [Column("insurance_type_id")]
        public int InsuranceTypeID { get; set; }

        [Column("insurance_description")]
        [Required]
        public string InsuranceDescription { get; set; } = string.Empty;

        [Column("deductible")]
        [Required]
        public decimal Deductible { get; set; }

        [Column("policy_limit_amount")]
        [Required]
        public decimal PolicyLimitAmount { get; set; }

        [Column("insurance_coverage_id")]
        [Required]
        public int InsuranceCoverageID { get; set; }

        [Column("exclusion_id")]
        [Required]
        public int ExclusionID { get; set; }

    }
}