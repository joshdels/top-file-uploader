import { supabase } from "../../lib/supabase.js";

export async function uploadFile(file, fileName) {
  const { data, error } = await supabase.storage
    .from("top_practice")
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
    });

  if (error) {
    throw error;
  }

  const { data: publicData } = supabase.storage
    .from("top_practice")
    .getPublicUrl(fileName);

  return {
    path: data.path,
    url: publicData.publicUrl,
  };
}

export async function deleteStoredFile(path) {
  const { error } = await supabase.storage.from("top_practice").remove(path);

  if (error) throw error;
}
