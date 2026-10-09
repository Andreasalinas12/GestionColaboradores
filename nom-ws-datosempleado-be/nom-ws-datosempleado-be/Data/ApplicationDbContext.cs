using Microsoft.EntityFrameworkCore;
using nom_ws_datosempleado_be.Models;

namespace nom_ws_datosempleado_be.Data
{
    public class ApplicationDbContext : DbContext
    {        public ApplicationDbContext(
            DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Colaborador> Colaboradores { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Colaborador>(entity =>
            {
                entity.ToTable("colaborador");

                entity.HasKey(e => e.IdColaborador);

                entity.Property(e => e.IdColaborador)
                    .HasColumnName("idcolaborador")
                    .ValueGeneratedNever();

                entity.Property(e => e.Nombre)
                    .HasColumnName("nombre");

                entity.Property(e => e.Apellido)
                    .HasColumnName("apellido");

                entity.Property(e => e.Direccion)
                    .HasColumnName("direccion");

                entity.Property(e => e.Edad)
                    .HasColumnName("edad");

                entity.Property(e => e.Profesion)
                    .HasColumnName("profesion");

                entity.Property(e => e.EstadoCivil)
                    .HasColumnName("estado_civil");
            });
        }
    }
}