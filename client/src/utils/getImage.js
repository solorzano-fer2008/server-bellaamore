const images = import.meta.glob('../assets/img/*.{png,jpg,jpeg,svg,webp}', { eager: true });

export const getImageUrl = (imageName) => {
    if (!imageName) return '';
    
    // Si ya es una URL completa (como las de Cloudinary), la devolvemos tal cual
    if (imageName.startsWith('http')) {
        return imageName;
    }

    const name = imageName.split('/').pop();
    const matchingKey = Object.keys(images).find(key => key.endsWith(`/${name}`));
    
    // Si encontramos la imagen localmente, la usamos
    if (matchingKey) {
        return images[matchingKey].default;
    }
    
    // Si no la encontramos localmente, intentamos cargarla del servidor
    const serverImageUrl = `https://server-bellaamore.vercel.app/uploads/${name}`;
    console.log('Imagen no encontrada localmente, usando servidor:', serverImageUrl);
    return serverImageUrl;
};
