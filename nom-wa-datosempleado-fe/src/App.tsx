
import { useState } from 'react';
import {
    FluentProvider,
    webLightTheme,
    Button,
    Card,
    Title3,
    Text,
    Badge,
    Input,
    Spinner,
    Table,
    TableHeader,
    TableHeaderCell,
    TableBody,
    TableRow,
    TableCell,
    Dialog,
    DialogSurface,
    DialogBody,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@fluentui/react-components';

import './App.css';

interface Colaborador {
    idColaborador: number;
    nombre: string;
    apellido: string;
    direccion: string;
    edad: number;
    profesion: string;
    estadoCivil: string;
}

function App() {
    const [colaboradores, setColaboradores] =
        useState<Colaborador[]>([]);

    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState('');
    const [busqueda, setBusqueda] = useState('');
    const [seleccionado, setSeleccionado] =
        useState<Colaborador | null>(null);
    const [dialogoAbierto, setDialogoAbierto] = useState(false);

    const cargarColaboradores = async () => {
        setCargando(true);
        setError('');

        try {
            const respuesta = await fetch(
                'https://localhost:7294/api/Colaboradores'
            );

            if (!respuesta.ok) {
                throw new Error(`Error HTTP ${respuesta.status}`);
            }

            const datos: Colaborador[] = await respuesta.json();
            setColaboradores(datos);

        } catch (err) {
            console.error(err);
            setError(
                'No se pudo conectar con la API. Verifica que el backend esté ejecutándose.'
            );
        } finally {
            setCargando(false);
        }
    };

    const obtenerNivelRiesgo = (edad: number): string => {
        if (edad < 18) return 'EDAD FUERA DE RANGO';
        if (edad <= 25) return 'FUERA DE PELIGRO';
        if (edad <= 50) {
            return 'TENGA CUIDADO, TOME TODAS LAS MEDIDAS DE PREVENCIÓN';
        }
        return 'POR FAVOR QUEDARSE EN CASA';
    };

    const obtenerColor = (
        edad: number
    ): 'success' | 'warning' | 'danger' | 'informative' => {
        if (edad < 18) return 'informative';
        if (edad <= 25) return 'success';
        if (edad <= 50) return 'warning';
        return 'danger';
    };

    const mostrarRiesgo = (colaborador: Colaborador) => {
        setSeleccionado(colaborador);
        setDialogoAbierto(true);
    };

    const filtrados = colaboradores.filter(c =>
        `${c.nombre} ${c.apellido} ${c.profesion}`
            .toLowerCase()
            .includes(busqueda.toLowerCase())
    );

    const mayores50 = colaboradores.filter(
        c => c.edad > 50
    ).length;

    return (
        <FluentProvider theme= { webLightTheme } >
        <div className="pagina" >

            <header className="encabezado" >
                <div className="encabezado-contenido" >
                    <h1>Gestión de Colaboradores </h1>
                        < p > Panel de administración de personal </p>
                            </div>
                            </header>

                            < main className = "contenido" >

                                <div className="estadisticas" >
                                    <Card className="estadistica" >
                                        <Text>Total de colaboradores </Text>
                                            < Title3 > { colaboradores.length } </Title3>
                                            </Card>

                                            < Card className = "estadistica" >
                                                <Text>Hasta 50 años </Text>
                                                    <Title3>
    {
        colaboradores.filter(
            c => c.edad <= 50
        ).length
    }
    </Title3>
        </Card>

        < Card className = "estadistica" >
            <Text>Mayores de 50 años </Text>
                < Title3 > { mayores50 } </Title3>
                </Card>
                </div>

                < Card className = "tarjeta" >

                    <div className="barra" >
                        <div>
                        <Title3>Listado de colaboradores </Title3>
                            < p > Información registrada en PostgreSQL </p>
                                </div>

                                < Button
    appearance = "primary"
    onClick = { cargarColaboradores }
    disabled = { cargando }
        >
    { cargando? 'Cargando...': 'Actualizar datos' }
        </Button>
        </div>

        < div className = "herramientas" >
            <Input
                placeholder="Buscar colaborador..."
    value = { busqueda }
    onChange = {(_, data) => setBusqueda(data.value)
}
              />
    <Text>
{ filtrados.length } registros
    </Text>
    </div>

{
    cargando && (
        <Spinner label="Consultando colaboradores..." />
            )
}

{
    error && (
        <p className="error" > { error } </p>
            )
}

<div className="tabla-contenedor" >
    <Table aria-label="Listado de colaboradores" >
        <TableHeader>
        <TableRow>
        <TableHeaderCell>Nombre </TableHeaderCell>
        < TableHeaderCell > Apellido </TableHeaderCell>
        < TableHeaderCell > Dirección </TableHeaderCell>
        < TableHeaderCell > Edad </TableHeaderCell>
        < TableHeaderCell > Profesión </TableHeaderCell>
        < TableHeaderCell > Estado civil </TableHeaderCell>
            < TableHeaderCell > Riesgo </TableHeaderCell>
            < TableHeaderCell > Acción </TableHeaderCell>
            </TableRow>
            </TableHeader>

            <TableBody>
{
    filtrados.map(c => (
        <TableRow key= { c.idColaborador } >
        <TableCell>{ c.nombre } </TableCell>
        < TableCell > { c.apellido } </TableCell>
        < TableCell > { c.direccion } </TableCell>
        < TableCell > { c.edad } </TableCell>
        < TableCell > { c.profesion } </TableCell>
        < TableCell > { c.estadoCivil } </TableCell>

        < TableCell >
        <Badge
                          appearance="filled"
                          color = { obtenerColor(c.edad)
}
                        >
{
    c.edad < 18
        ? 'Fuera de rango'
        : c.edad <= 25
            ? 'Bajo'
            : c.edad <= 50
                ? 'Precaución'
                : 'Alto'
}
    </Badge>
    </TableCell>

    < TableCell >
    <Button
                          appearance="outline"
onClick = {() => mostrarRiesgo(c)}
                        >
    Ver riesgo
        </Button>
        </TableCell>
        </TableRow>
                  ))}
</TableBody>
    </Table>
    </div>

{
    !cargando && filtrados.length === 0 && (
        <p className="sin-datos" >
        {
            colaboradores.length === 0
                ? 'Presiona Actualizar datos para consultar los colaboradores.'
                : 'No se encontraron colaboradores.'
        }
            </p>
            )
}

</Card>
    </main>

    < Dialog
open = { dialogoAbierto }
onOpenChange = {(_, data) =>
setDialogoAbierto(data.open)
          }
        >
    <DialogSurface>
    <DialogBody>
    <DialogTitle>
    Nivel de riesgo del colaborador
        </DialogTitle>

        <DialogContent>
{
    seleccionado && (
        <div className="detalle-riesgo" >
            <Text weight="semibold" >
            { seleccionado.nombre } { seleccionado.apellido }
    </Text>

        <Text>
    Edad: { seleccionado.edad } años
        </Text>

        < Badge
    appearance = "filled"
    color = { obtenerColor(seleccionado.edad) }
        >
    { obtenerNivelRiesgo(seleccionado.edad) }
        </Badge>
        </div>
                )
}
</DialogContent>

    < DialogActions >
    <Button
                  appearance="primary"
onClick = {() => setDialogoAbierto(false)}
                >
    Cerrar
    </Button>
    </DialogActions>
    </DialogBody>
    </DialogSurface>
    </Dialog>

    </div>
    </FluentProvider>
  );
}

export default App;
