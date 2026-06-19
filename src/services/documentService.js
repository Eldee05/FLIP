import { supabase } from "../lib/supabase";

const API_URL = "https://flip-backend.vercel.app";

export const uploadDocument = async (file) => {
  try {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from('documents')
      .upload(fileName, file, {
        contentType: file.type,
        upsert: false
      });

    if (error) throw error;

    const { data: urlData } = supabase.storage.from('documents').getPublicUrl(fileName);

    return {
      originalName: file.name,
      size: file.size,
      fileName: fileName,
      url: urlData.publicUrl
    };
  } catch (supabaseError) {
    console.error('Supabase upload failed, trying backend:', supabaseError);
    const formData = new FormData();
    formData.append('document', file);
    const response = await fetch(`${API_URL}/api/v1/documents/upload`, {
      method: 'POST',
      headers: { 'ngrok-skip-browser-warning': 'true' },
      body: formData
    });
    if (!response.ok) throw new Error('Upload failed');
    const data = await response.json();
    return {
      originalName: data.data.originalName || file.name,
      size: data.data.size || file.size,
      fileName: data.data.filename || file.name,
    };
  }
};

export const listDocuments = async () => {
  try {
    const { data, error } = await supabase.storage.from('documents').list();
    if (error) throw error;
    return (data || []).map(doc => ({
      id: doc.id || doc.name,
      name: doc.name.replace(/^\d+-/, ''),
      size: doc.metadata?.size || 0,
      fileName: doc.name,
      uploaded: new Date(doc.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      type: doc.name.match(/\.(jpg|jpeg|png|gif|webp|bmp)$/i) ? 'image' :
            doc.name.match(/\.pdf$/i) ? 'pdf' :
            doc.name.match(/\.(doc|docx)$/i) ? 'doc' : 'other',
    }));
  } catch {
    const response = await fetch(`${API_URL}/api/v1/documents`, {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.documents || [];
  }
};

export const deleteDocument = async (fileName) => {
  try {
    const { error } = await supabase.storage.from('documents').remove([fileName]);
    if (error) throw error;
    return true;
  } catch {
    const response = await fetch(`${API_URL}/api/v1/documents/${fileName}`, {
      method: 'DELETE',
      headers: { 'ngrok-skip-browser-warning': 'true' }
    });
    if (!response.ok) throw new Error('Delete failed');
    return true;
  }
};

export const getDownloadUrl = async (fileName) => {
  const { data } = supabase.storage.from('documents').getPublicUrl(fileName);
  return data.publicUrl;
};
