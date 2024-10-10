const comment = require("jade/lib/nodes/comment");
const text = require("jade/lib/nodes/text");

const posts = [
    { id: 1, title: 'Publicación 1', description: 'Descripción 1', url: 'https://example.com/img1', comments: [{text:  'Comentario 1',  author: 'Autor 1'}] },
    { id: 2, title: 'Publicación 2', description: 'Descripción 2', url: 'https://example.com/img2' }
];

class PostController {
    // Crear una nueva publicación
    createPost(req, res) {
        const { title, description, url } = req.body;
        const id = Math.floor(Math.random() * 100);
        console.log(id)

        posts.push({id, title, description, url, comments: [] })
        // Aquí puedes agregar la publicación
        res.status(201).json({ message: 'Publicación creada', post: { title, description, url } });
    }

    // Listar todas las publicaciones
    getPosts(req, res) { 
        res.status(200).json(posts);
    }

    // comentar un post
    commentPosts(req, res) {
        const { id } = req.params;
        const post = posts.find(p => p.id === parseInt(id));
        if (!post) return res.status(404).send('Publicación no encontrada');

        const { text, author } = req.body;
        const comment = { id: post.comments.length + 1, text, author };
        post.comment.push(comment);
        res.status(201).json(comment)
        console.log(comment)
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
