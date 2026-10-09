using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using nom_ws_datosempleado_be.Data;

namespace nom_ws_datosempleado_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColaboradoresController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ColaboradoresController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetColaboradores()
        {
            try
            {
                var colaboradores = await _context.Colaboradores
                    .AsNoTracking()
                    .OrderBy(c => c.IdColaborador)
                    .ToListAsync();

                return Ok(colaboradores);
            }
            catch (Exception)
            {
                return Problem(
                    title: "Error al consultar.",
                    detail: "No fue posible obtener la información.",
                    statusCode: 500
                );
            }
        }
    }
}