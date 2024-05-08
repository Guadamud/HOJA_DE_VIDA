import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

    const pacienteRecords = await prisma.paciente.createMany({
        data: [
            {
                nombre: 'Jose',
                identificacion: '1316066776',

            },
            {
                nombre: 'Marcos',
                identificacion: '1316066777',
                
            },
            {
                nombre: 'Jesus',
                identificacion: '1316066778',
               
            }
        ]
    });
    
    console.log({ pacienteRecords });

    const signoVitalRecords = await prisma.signoVital.createMany({
        data: [
            {
                descripcion: 'Presión arterial',
                nivelMinimo: 70,
                nivelMaximo: 130,
               
            },
            {
                descripcion: 'Frecuencia cardíaca',
                nivelMinimo: 60,
                nivelMaximo: 100,
               
            },
            {
                descripcion: 'Temperatura corporal',
                nivelMinimo: 36,
                nivelMaximo: 37.5,
               
            }
        ]
    });
    
    console.log({ signoVitalRecords });
    
    const controlRecords = await prisma.controlRealizado.createMany({
        data: [
            // Control realizado para el paciente 'Jose' - Presión arterial
            {
                pacienteId: 1, 
                signoVitalId: 1, 
                fecha: '2024-05-07', 
                hora: 'T08:00:00', 
                valor: 120, 
                estado: true 
            },
            // Control realizado para el paciente 'Marcos' - Frecuencia cardíaca
            {
                pacienteId: 2, 
                signoVitalId: 2, 
                fecha: '2024-05-07', 
                hora: 'T09:30:00', 
                valor: 80, 
                estado: true 
            },
            // Control realizado para el paciente 'Jesus' - Temperatura corporal
            {
                pacienteId: 3, 
                signoVitalId: 3, 
                fecha: '2024-05-07', 
                hora: 'T10:45:00', 
                valor: 36.5, 
                estado: true 
            }

        ]
    });
    
    console.log({ controlRecords });
    

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })


 //Crear Funcion ELIMINAR
async function eliminar(id: number) {
    try {
        const controlRealizado = await prisma.controlRealizado.findUnique({
            where: { id: id },
        });

        if (controlRealizado) {
            await prisma.controlRealizado.update({
                where: { id: id },
                data: { estado: false },
            });
            console.log(`Transacción con id ${id} eliminada.`);
        } else {
            console.log(`ControlRealizado con id ${id} no encontrado.`);
        }
    } catch (error) {
        console.error('Error al eliminar la transacción:', error);
    } finally {
        await prisma.$disconnect();
    }
}

eliminar(1);



    //Crear la Funcion RECUPERAR
async function recuperar(id: number) {
    try {
        const controlRealizado = await prisma.controlRealizado.findUnique({
            where: { id: id },
        });

        if (controlRealizado) {
            await prisma.controlRealizado.update({
                where: { id: id },
                data: { estado: true },
            });
            console.log(`Transacción con id ${id} recuperada.`);
        } else {
            console.log(`ControlRealizado con id ${id} no encontrado.`);
        }
    } catch (error) {
        console.error('Error al recuperar la transacción:', error);
    } finally {
        await prisma.$disconnect();
    }
}

recuperar(1);
