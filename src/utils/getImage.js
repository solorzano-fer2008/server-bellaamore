const images = import.meta.glob('../assets/img/*.{png,jpg,jpeg,svg,webp}', { eager: true });

export const getImageUrl = (imageName) => {
    if (!imageName) return '';
    const name = imageName.split('/').pop();
    const matchingKey = Object.keys(images).find(key => key.endsWith(`/${name}`));
    return matchingKey ? images[matchingKey].default : '';
};
