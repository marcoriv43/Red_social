const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
];

class UserController {
    // Método para crear un nuevo usuario
    createUser(req, res) {
        const {name, email } = req.body;
        // Buscar si el usuario ya existe
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            res.status(400).json({ message: 'El usuario ya existe' });
            return;
        }
        // Si no existe, agregarlo al arreglo
        const id = Math.floor(Math.random() * 100);
        console.log(id)
        users.push({ id, name, email });
        res.status(201).json({ message: 'Usuario creado', user: { name, email } });
    }

    // Método para listar usuarios
    getUsers(req, res) {
        res.status(200).json(users);
    }

    // Método para actualizar usuario
    updateUser(req, res) {
        const { id } = req.params;
        const { name, email } = req.body;
        // Buscar el usuario por ID
        const existingUserIndex = users.findIndex(user => user.id === parseInt(id));
        if (existingUserIndex !== -1) {
            // Actualizar el usuario encontrado
            users[existingUserIndex] = {
                ...users[existingUserIndex],
                name,
                email
            };

            res.status(200).json({ message: `Usuario ${id} actualizado`, updatedUser: users[existingUserIndex] });
        } else {
            res.status(404).json({ message: `No se encontró el usuario con ID ${id}` });
        }
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

module.exports = new UserController();const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
];

class UserController {
    // Método para crear un nuevo usuario
    createUser(req, res) {
        const {name, email } = req.body;
        // Buscar si el usuario ya existe
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            res.status(400).json({ message: 'El usuario ya existe' });
            return;
        }
        // Si no existe, agregarlo al arreglo
        const id = Math.floor(Math.random() * 100);
        console.log(id)
        users.push({ id, name, email });
        res.status(201).json({ message: 'Usuario creado', user: { name, email } });
    }

    // Método para listar usuarios
    getUsers(req, res) {
        res.status(200).json(users);
    }

    // Método para actualizar usuario
    updateUser(req, res) {
        const { id } = req.params;
        const { name, email } = req.body;
        // Buscar el usuario por ID
        const existingUserIndex = users.findIndex(user => user.id === parseInt(id));
        if (existingUserIndex !== -1) {
            // Actualizar el usuario encontrado
            users[existingUserIndex] = {
                ...users[existingUserIndex],
                name,
                email
            };

            res.status(200).json({ message: `Usuario ${id} actualizado`, updatedUser: users[existingUserIndex] });
        } else {
            res.status(404).json({ message: `No se encontró el usuario con ID ${id}` });
        }
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