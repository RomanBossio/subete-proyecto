using Microsoft.EntityFrameworkCore;
using System;

public class SubeteContext : DbContext
{
    public SubeteContext(DbContextOptions<SubeteContext> options) : base(options) { }

    public DbSet<Usuario> Usuarios { get; set; }

    // Podés agregar más DbSets para las otras tablas si querés.
}
