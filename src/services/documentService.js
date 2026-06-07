import { supabase } from "../lib/supabase";

export async function uploadDocument(file) {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("case-documents")
    .upload(fileName, file);

  if (error) throw error;

  return {
    fileName,
    originalName: file.name,
    size: file.size,
    uploadedAt: new Date().toISOString(),
  };
}

export async function listDocuments() {
  const { data, error } = await supabase.storage
    .from("case-documents")
    .list("", {
      limit: 100,
      sortBy: {
        column: "created_at",
        order: "desc",
      },
    });

  if (error) throw error;

  return data;
}

export async function deleteDocument(fileName) {
  const { error } = await supabase.storage
    .from("case-documents")
    .remove([fileName]);

  if (error) throw error;
}

export async function getDownloadUrl(fileName) {
  const { data, error } = await supabase.storage
    .from("case-documents")
    .createSignedUrl(fileName, 60);

  if (error) throw error;

  return data.signedUrl;
}
