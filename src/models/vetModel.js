// // models/veterinario.js
// const db = require('../config/db'); // Ajusta la ruta según tu estructura

// class Veterinario {
//     constructor(veterinario) {
//         this.Nombre = veterinario.Nombre;
//         this.Usuario = veterinario.Usuario;
//         this.Contrasena = veterinario.Contrasena;
//         this.Especialidad = veterinario.Especialidad;
//         this.Telefono = veterinario.Telefono;
//         this.CorreoElectronico = veterinario.CorreoElectronico;
//     }

//     static findAll() {
//         return db.execute('CALL sp_GetAllVeterinarios()');
//     }

//     static findById(id) {
//         return db.execute('CALL sp_FindVeterinarioByID(?)', [id])
//             .then(([results, fields]) => {
//                 console.log("Datos del veterinario:", results);
//                 return results[0]; // Asegúrate de que esto devuelve lo que esperas
//             })
//             .catch(error => {
//                 console.error("Error en findById:", error);
//                 throw error;
//             });
//     }
    

//     static async findByUsuario(usuario) {
//         if (!usuario) {
//             throw new Error("El parámetro 'usuario' no puede ser nulo o indefinido.");
//         }
//         try {
//             const [results, fields] = await db.execute('CALL sp_FindVeterinarioByUsuario(?)', [usuario]);
//             // Asegúrate de acceder al resultado de la forma correcta, esto depende de cómo MySQL devuelve los datos de un procedimiento almacenado
//             return results[0]; // Esto puede variar dependiendo de la estructura de los datos devueltos por tu procedimiento almacenado
//         } catch (error) {
//             console.error("Error en findByUsuario:", error);
//             throw error; // Lanza el error para manejarlo en el controlador
//         }
//     }
    

//     static create(newVet) {
//         return db.execute(
//             'CALL sp_InsertVeterinario(?, ?, ?, ?, ?, ?)',
//             [newVet.Nombre, newVet.Usuario, newVet.Contrasena, newVet.Especialidad, newVet.Telefono, newVet.CorreoElectronico]
//         );
//     }

//     static update(id, vet) {
//         return db.execute(
//             'CALL sp_UpdateVeterinario(?, ?, ?, ?, ?, ?, ?)',
//             [id, vet.Nombre, vet.Usuario, vet.Contrasena, vet.Especialidad, vet.Telefono, vet.CorreoElectronico]
//         );
//     }

//     static delete(id) {
//         return db.execute('CALL sp_DeleteVeterinario(?)', [id]);
//     }

//     static updateInfo(vet) {
//         return db.execute(
//             'CALL sp_UpdateVeterinarioInfo(?, ?, ?, ?, ?, ?)',
//             [vet.VeterinarioID, vet.Nombre, vet.Usuario, vet.Especialidad, vet.Telefono, vet.CorreoElectronico]
//         );
//     }

//     static updatePassword(vetID, newPassword) {
//         return db.execute(
//             'CALL sp_UpdateVeterinarioPassword(?, ?)',
//             [vetID, newPassword]
//         );
//     }
// }

// module.exports = Veterinario;