import imageCompression from 'browser-image-compression';

export async function handleCompressImages(imageFiles: File[] = []) {

    const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
    }

    if (!Array.isArray(imageFiles)) {
        return []
    }

    const compressedImageFiles: File[] = []
    try {

        for (const file of imageFiles) {
            const compressedFile = await imageCompression(file, options);

            compressedImageFiles.push(compressedFile)
        }

        return compressedImageFiles
    } catch (error) {
        console.log(error);
        return []
    }

}