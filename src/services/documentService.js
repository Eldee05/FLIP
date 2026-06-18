const API_URL = "https://eleven-varmint-boogeyman.ngrok-free.dev";

const getToken = () => localStorage.getItem('token');

const fetchOptions = (method, body) => {
    const opts = {
        method,
        headers: {
            'ngrok-skip-browser-warning': 'true',
        }
    };
    if (body && !(body instanceof FormData)) {
        opts.headers['Content-Type'] = 'application/json';
        opts.body = JSON.stringify(body);
    } else if (body instanceof FormData) {
        opts.body = body;
    }
    return opts;
};

export const uploadDocument = async (file) => {
    const formData = new FormData();
    formData.append('document', file);

    const response = await fetch(`${API_URL}/api/v1/documents/upload`, fetchOptions('POST', formData));

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
    }

    const data = await response.json();
    return {
        originalName: data.data.originalName || file.name,
        size: data.data.size || file.size,
        fileName: data.data.filename || file.name,
    };
};

export const listDocuments = async () => {
    const response = await fetch(`${API_URL}/api/v1/documents`, fetchOptions('GET'));

    if (!response.ok) {
        console.error('Failed to fetch documents');
        return [];
    }

    const data = await response.json();
    return (data.documents || []).map(doc => ({
        id: doc.filename,
        name: doc.filename.replace(/^\d+-/, ''),
        size: doc.size || 0,
        fileName: doc.filename,
        uploaded: doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Unknown',
        type: doc.filename.match(/\.(jpg|jpeg|png|gif|webp|bmp)$/i) ? 'image' :
              doc.filename.match(/\.pdf$/i) ? 'pdf' :
              doc.filename.match(/\.(doc|docx)$/i) ? 'doc' : 'other',
    }));
};

export const deleteDocument = async (fileName) => {
    const response = await fetch(`${API_URL}/api/v1/documents/${fileName}`, fetchOptions('DELETE'));

    if (!response.ok) {
        throw new Error('Delete failed');
    }
    return true;
};

export const getDownloadUrl = async (fileName) => {
    return `${API_URL}/api/v1/documents/${fileName}/download`;
};
