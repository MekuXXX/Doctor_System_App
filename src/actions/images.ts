"use server";
import { DEFAULT_IMG } from "@/lib/constants";
import { promises as fs } from "fs"; // For development/testing purposes (not recommended for production)

export async function readImage(imgPath: string) {
  try {
    if (imgPath.startsWith("http")) return imgPath;
    const file = await fs.readFile(imgPath); // Read file data (not recommended for production)
    const base64Data = Buffer.from(file).toString("base64"); // Encode as base64
    return `data:image/jpeg;base64,${base64Data}`; // Return data URI for development/testing
  } catch (err) {
    return DEFAULT_IMG;
  }
}
