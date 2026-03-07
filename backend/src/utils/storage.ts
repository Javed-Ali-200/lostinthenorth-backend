import supabase from '../config/supabase.js';
import path from 'path';

/**
 * Upload a file to a specific Supabase Storage bucket.
 * @param file - Multer file object
 * @param bucketName - Name of the Supabase bucket
 * @returns Public URL of the uploaded image
 */
export const uploadToSupabase = async (file: Express.Multer.File, bucketName: string): Promise<string> => {
    const fileExt = path.extname(file.originalname);
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExt}`;
    const filePath = fileName;

    const { error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file.buffer, {
            contentType: file.mimetype,
            upsert: false,
        });

    if (error) {
        throw new Error(`Supabase Storage Error: ${error.message}`);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

    return publicUrl;
};

/**
 * Upload multiple files to a Supabase bucket.
 */
export const uploadMultipleToSupabase = async (
    files: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] } | undefined,
    bucketName: string
): Promise<string[]> => {
    if (!files) return [];

    let filesArray: Express.Multer.File[] = [];
    if (Array.isArray(files)) {
        filesArray = files;
    } else {
        // Handling upload.fields() scenario if needed, though usually we pass the specific array
        filesArray = Object.values(files).flat();
    }

    const uploadPromises = filesArray.map((file) => uploadToSupabase(file, bucketName));
    return Promise.all(uploadPromises);
};
