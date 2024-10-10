const amistades=[
    { userId: "19", friendId: "20"},
    { userId: "20", friendId: "7"},
]

class FriendshipController {
  
    sendFriendRequest (req, res) {
        const { userId, friendId } = req.body;
        // Buscar friendID de la solicitud
        const existingFriendship = amistades.find(userObject => userObject.userId == userId)
        //BUSCAR USUARIO EN BASE DE DATOS
        if (existingFriendship) {
            res.status(400).json({ message: 'La amistad ya existe' });
            return;
        }
        // Si no existe, agregarlo al arreglo
        amistades.push({ userId, friendId });
        res.status(201).json({ message: `Solicitud de amistad enviada de ${userId} a ${friendId}` });
        console.log(amistades)
    };


    // Eliminar amistad
    removeFriend(req, res) {
        const { userId, friendId } = req.body;
        // Aquí eliminarías la amistad entre userId y friendId
        const usuario1 = usuarios.find(user => user.id === userId);
        const usuario2 = usuarios.find(user => user.id === friendId);
        
        if (!usuario1 || !usuario2) return res.status(404).send("Usuario no encontrado");
        
        usuario1.amigos = usuario1.amigos.filter(amigoId => amigoId !== friendId);
        usuario2.amigos = usuario2.amigos.filter(amigoId => amigoId !== userId);
        console.log(amigoId)
        res.status(200).json({ message: `Amistad entre ${userId} y ${friendId} eliminada` });
        console.log(amistades)
    }

    // Mostrar feed de publicaciones de amigos
    getFriendFeed(req, res) {
        const { userId } = req.params;
        // Simula las publicaciones del feed de amigos
        const friendFeed = [
            { id: 1, title: 'Publicación de amigo 1', description: 'Descripción 1', url: 'https://example.com/img1' },
            { id: 2, title: 'Publicación de amigo 2', description: 'Descripción 2', url: 'https://example.com/img2' }
        ];
        res.status(200).json(friendFeed);
    }
}

module.exports = new FriendshipController();
