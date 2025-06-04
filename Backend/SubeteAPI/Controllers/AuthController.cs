using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly SubeteContext _context;

    public AuthController(SubeteContext context)
    {
        _context = context;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        // Buscamos el usuario por email
        var user = await _context.Usuarios
            .FirstOrDefaultAsync(u => u.Email == request.Email);

        if (user == null)
        {
            return Unauthorized("Email o contraseña incorrectos.");
        }

        // Verificamos la contraseña
        if (!VerifyPassword(request.Password, user.PasswordHash))
        {
            return Unauthorized("Email o contraseña incorrectos.");
        }

        // Si todo bien, devolvemos un OK con datos básicos del usuario
        return Ok(new
        {
            message = "Login exitoso",
            user.ID_Usuario,
            user.Nombre,
            user.Apellido,
            user.Email
        });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        // Verificar que el email no exista ya
        var existingUser = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == request.Email);
        if (existingUser != null)
        {
            return Conflict("El email ya está registrado.");
        }

        // Generar hash de la contraseña
        using var sha256 = System.Security.Cryptography.SHA256.Create();
        var passwordHash = sha256.ComputeHash(System.Text.Encoding.UTF8.GetBytes(request.Password));

        // Crear usuario
        var newUser = new Usuario
        {
            Nombre = request.Nombre,
            Apellido = request.Apellido,
            Email = request.Email,
            Telefono = request.Telefono,
            PasswordHash = passwordHash,
            EsConductor = request.EsConductor,
            Fecha_Registro = DateTime.UtcNow
        };

        _context.Usuarios.Add(newUser);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Usuario registrado exitosamente." });
    }

    // Método para comparar el hash de la contraseña
    private bool VerifyPassword(string password, byte[] passwordHash)
    {
        using var sha256 = System.Security.Cryptography.SHA256.Create();
        var hash = sha256.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        return hash.SequenceEqual(passwordHash);
    }
}
