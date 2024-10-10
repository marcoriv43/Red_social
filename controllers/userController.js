class UserController {
    // Método para crear un nuevo usuario
    createUser(req, res) {
        const { name, email } = req.body;
        // Aquí puedes realizar la lógica de agregar el usuario
        res.status(201).json({ message: 'Usuario creado', user: { name, email } });
    }

    // Método para listar usuarios
    getUsers(req, res) {
        // Simula la lista de usuarios
        const users = [
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
        ];
        res.status(200).json(users);
    }

    // Método para actualizar usuario
    updateUser(req, res) {
        const { id } = req.params;
        const { name, email } = req.body;
        // Aquí puedes actualizar el usuario con ID = id
        res.status(200).json({ message: `Usuario ${id} actualizado`, updatedUser: { name, email } });
    }

       // Método para eliminar un usuario
       deleteUser(req, res) {
        const { id } = req.params;
        // Buscar el usuario por ID
        const existingUserIndex = users.findIndex(user => user.id === parseInt(id));
        if (existingUserIndex !== -1) {
            // Eliminar el usuario encontrado
            users.splice(existingUserIndex, 1);

            res.status(200).json({ message: `Usuario ${id} eliminado` });
        } else {
            res.status(404).json({ message: `No se encontró el usuario con ID ${id}` });
        }
    }
}

module.exports = new UserController();
