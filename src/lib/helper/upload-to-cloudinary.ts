const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET!; 
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME!;
const CLOUDINARY_UPLOAD_URL = process.env.CLOUDINARY_UPLOAD_URL!;

async function uploadImageToCloudinary(file: File): Promise<string | null> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
        const response = await fetch(CLOUDINARY_UPLOAD_URL, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) throw new Error("Cloudinary upload failed");

        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        return null;
    }
}