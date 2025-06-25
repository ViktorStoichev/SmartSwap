// Service for uploading and deleting images to the external server

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch('https://express-api-server-6ugj.onrender.com/smartswap/upload', {
        method: 'POST',
        body: formData,
    });

    if (!res.ok) {
        throw new Error('Failed to upload image');
    }

    const data = await res.json();
    // data: { url, public_id }
    return data;
};

export const deleteImage = async (public_id) => {
    const url = new URL('https://express-api-server-6ugj.onrender.com/smartswap/delete');
    url.searchParams.append('public_id', public_id);

    const res = await fetch(url.toString(), {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error('Failed to delete image');
    }

    const data = await res.json();
    return data;
};