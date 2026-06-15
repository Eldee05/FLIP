import { useStore } from '../store/useStore';

const API_URL = "https://nebulose-unbiddable-eleonora.ngrok-free.dev";

// Helper to get auth token
const getToken = () => localStorage.getItem('token');

// Upload document
export const uploadDocument = async (file) => {
    const token = getToken();
    const formData = new FormData();
    formData.append('document', file);
    
    const response = await fetch(`${API_URL}/api/v1/documents/upload`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
    }
    
    const data = await response.json();
    return {
        originalName: file.name,
        size: file.size,
        fileName: data.document?.filename || file.name,
        id: data.document?.id || Date.now()
    };
};

// List user documents
export const listDocuments = async () => {
    const token = getToken();
    
    const response = await fetch(`${API_URL}/api/v1/documents`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    if (!response.ok) {
        console.error('Failed to fetch documents');
        return [];
    }
    
    const data = await response.json();
    return data.documents || [];
};

// Delete document
export const deleteDocument = async (fileName) => {
    const token = getToken();
    
    const response = await fetch(`${API_URL}/api/v1/documents/${fileName}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    if (!response.ok) {
        throw new Error('Delete failed');
    }
    
    return true;
};

// Get download URL
export const getDownloadUrl = async (fileName) => {
    const token = getToken();
    return `${API_URL}/api/v1/documents/${fileName}/download?token=${token}`;
};
