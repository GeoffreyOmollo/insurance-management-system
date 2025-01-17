using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InsurancePolicyAPI.Models
{
    public class InsurancePolicy
    {

        [Key]
        [Column("insurance_policy_id")]
        public int InsurancePolicyID { get; set; }

        [Required]
        [Column("policy_holder")]
        public string PolicyHolder { get; set; } = string.Empty;

        [Required]
        [Column("insurance_type_id")]
        public int InsuranceTypeID { get; set; }

        [Required]
        [Column("premium_amount")]
        public decimal PremiumAmount { get; set; }

    }
}