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
        const existingPostIndex = posts.findIndex(post => post.id === parseInt(id));
        if (existingPostIndex !== -1) {
            // Actualizar el usuario encontrado
            posts[existingPostIndex] = {
                ...posts[existingPostIndex],
                title,
                description,
                url
            };

            res.status(200).json({ message: `La publicarion ${id} fue actualizada`, updatedPosts: posts[existingPostIndex] });
        } else {
            res.status(404).json({ message: `No se encontró la publicación con ID ${id}` });
        }


    }

    // Eliminar una publicación
    deletePost(req, res) {
        const { id } = req.params;
        const existingPostIndex = posts.findIndex(post => post.id === parseInt(id));
        if (existingPostIndex !== -1) {
            // Eliminar el usuario encontrado
            users.splice(existingPostIndex, 1);
          // Aquí eliminarías la publicación con ID = id
            res.status(200).json({ message: `Publicación ${id} eliminada` });
        } else {
            res.status(404).json({ message: `No se encontró el usuario con ID ${id}` });
        }        
    }
}

module.exports = new PostController();
