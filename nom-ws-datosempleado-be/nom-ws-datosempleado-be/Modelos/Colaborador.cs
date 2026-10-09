namespace nom_ws_datosempleado_be.Models
{
    public class Colaborador
    {
        public int IdColaborador { get; set; }

        public string Nombre { get; set; } = string.Empty;

        public string Apellido { get; set; } = string.Empty;

        public string? Direccion { get; set; }

        public int Edad { get; set; }

        public string? Profesion { get; set; }

        public string? EstadoCivil { get; set; }
    }
}