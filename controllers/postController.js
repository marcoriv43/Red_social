class PostController {
    // Crear una nueva publicación
    createPost(req, res) {
        const { title, description, url } = req.body;
        // Aquí puedes agregar la publicación
        res.status(201).json({ message: 'Publicación creada', post: { title, description, url } });
    }

    // Listar todas las publicaciones
    getPosts(req, res) {
        // Simula la lista de publicaciones
        const posts = [
            { id: 1, title: 'Publicación 1', description: 'Descripción 1', url: 'https://example.com/img1' },
            { id: 2, title: 'Publicación 2', description: 'Descripción 2', url: 'https://example.com/img2' }
        ];
        res.status(200).json(posts);
    }

    // Obtener publicaciones de un usuario específico
    getUserPosts(req, res) {
        const { userId } = req.params;
        // Aquí obtendrás las publicaciones del usuario con ID = userId
        const userPosts = [
            { id: 1, title: 'Publicación 1', description: 'Descripción 1', url: 'https://example.com/img1', userId },
        ];
        res.status(200).json(userPosts);
    }

    // Editar una publicación
    updatePost(req, res) {
        const { id } = req.params;
        const { title, description, url } = req.body;
        // Aquí puedes actualizar la publicación con ID = id
        res.status(200).json({ message: `Publicación ${id} actualizada`, updatedPost: { title, description, url } });
    }

    // Eliminar una publicación
    deletePost(req, res) {
        const { id } = req.params;
        // Aquí eliminarías la publicación con ID = id
        res.status(200).json({ message: `Publicación ${id} eliminada` });
    }
}

module.exports = new PostController();
