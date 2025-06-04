using System;
using System.ComponentModel.DataAnnotations;  // ➜ Agregamos este using

public class Usuario
{
    [Key]  // ➜ Definimos la clave primaria
    public int ID_Usuario { get; set; }

    public string Nombre { get; set; } = string.Empty;
    public string Apellido { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Telefono { get; set; } = string.Empty;
    public byte[] PasswordHash { get; set; } = Array.Empty<byte>();
    public bool EsConductor { get; set; }
    public DateTime Fecha_Registro { get; set; }
}



