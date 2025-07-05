import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/db/firebase";

export const convertToWebP = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxWidth = 800; // Maximum width
        const maxHeight = 800; // Maximum height
        let width = img.width;
        let height = img.height;

        // Resize to maintain aspect ratio
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = (maxWidth / width) * height;
            width = maxWidth;
          } else {
            width = (maxHeight / height) * width;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const webpFile = new File(
                [blob],
                file.name.replace(/\.\w+$/, ".webp"),
                {
                  type: "image/webp",
                }
              );
              resolve(webpFile);
            } else {
              reject(new Error("Conversion to WebP failed"));
            }
          },
          "image/webp",
          0.8 // Quality factor (0.0 to 1.0)
        );
      };
      img.onerror = () =>
        reject(new Error("Failed to load image for conversion"));
      img.src = event.target.result;
    };

    reader.onerror = () => reject(new Error("File reading failed"));
    reader.readAsDataURL(file);
  });
};

export const uploadImage = async (
  file: File,
  path: string
): Promise<string> => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const generateImagePath = (
  issueType: string,
  roomNumber: string,
  fileName: string
): string => {
  const timestamp = Date.now();
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "");
  return `issues/${issueType}/${roomNumber}/${timestamp}_${sanitizedFileName}`;
};
