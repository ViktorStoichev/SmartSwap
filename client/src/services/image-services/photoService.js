// Photo Service
// Handles image upload and deletion to external image server
// Integrates with external API for cloud image storage

// Upload image to external server
export const uploadImage = async (file) => {
    // Create FormData to send file to server
    const formData = new FormData();
    formData.append('image', file);

    // Send POST request to external image upload API
    const res = await fetch('https://express-api-server-6ugj.onrender.com/smartswap/upload', {
        method: 'POST',
        body: formData,
    });

    // Throw error if upload fails
    if (!res.ok) {
        throw new Error('Failed to upload image');
    }

    // Parse and return response data (contains url and public_id)
    const data = await res.json();
    // data: { url, public_id }
    return data;
};

// Delete image from external server using public_id
export const deleteImage = async (public_id) => {
    // Construct URL with public_id as query parameter
    const url = new URL('https://express-api-server-6ugj.onrender.com/smartswap/delete');
    url.searchParams.append('public_id', public_id);

    // Send DELETE request to external image deletion API
    const res = await fetch(url.toString(), {
        method: 'DELETE',
    });

    // Throw error if deletion fails
    if (!res.ok) {
        throw new Error('Failed to delete image');
    }

    // Parse and return response data
    const data = await res.json();
    return data;
};