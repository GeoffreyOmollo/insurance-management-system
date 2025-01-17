using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InsurancePolicyAPI.Models
{
    public class Exclusion
    {
        [Key]
        [Column("exclusion_id")]
        public int ExclusionID { get; set; }

        [Column("exclusion_description")]
        [Required]
        public string ExclusionDescription { get; set; } = string.Empty;
    }
}