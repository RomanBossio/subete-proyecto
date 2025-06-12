using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Viaje
{
    [Key]
    public int ID_Viaje { get; set; }

    [Required]
    public int ID_Conductor { get; set; }

    [Required]
    public string Origen { get; set; } = string.Empty;

    [Required]
    public string Destino { get; set; } = string.Empty;

    [Required]
    public DateTime Fecha_Hora_Salida { get; set; }

    [Required]
    public byte Lugares_Disponibles { get; set; }

    [Required]
    [Column(TypeName = "decimal(10, 2)")]
    public decimal Precio { get; set; }

    public bool Permite_Encomiendas { get; set; } = false;

    public string? Detalles { get; set; }

    [Required]
    public string Estado { get; set; } = "Disponible";

    // Relación con Usuario (opcional si usás navegación)
    [ForeignKey("ID_Conductor")]
    public Usuario? Conductor { get; set; }
}
