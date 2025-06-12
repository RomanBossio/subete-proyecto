using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("[controller]")]
public class ViajesController : ControllerBase
{
    private readonly SubeteContext _context;

    public ViajesController(SubeteContext context)
    {
        _context = context;
    }

    // GET: /viajes
    [HttpGet]
    public async Task<IActionResult> GetViajes()
    {
        var viajes = await _context.Viajes.ToListAsync();
        return Ok(viajes);
    }

    // POST: /viajes
    [HttpPost]
    public async Task<IActionResult> CrearViaje([FromBody] Viaje nuevoViaje)
    {
        // Validación simple (podés hacerla más robusta después)
        if (!ModelState.IsValid)
        return BadRequest(ModelState);

        _context.Viajes.Add(nuevoViaje);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Viaje creado correctamente", nuevoViaje.ID_Viaje });
    }

}

