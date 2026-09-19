import { PicsumImage } from "../types";

const BASE_URL = "https://picsum.photos/v2/list";

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export async function fetchImages(
  page: number,
  limit = 20
): Promise<PicsumImage[]> {
  try {
    const response = await fetch(
      `${BASE_URL}?page=${page}&limit=${limit}`
    );

    if (!response.ok) {
      throw new ApiError(
        `Failed to load images (status ${response.status}).`
      );
    }

    const data = (await response.json()) as PicsumImage[];

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      "Couldn't reach the image service. Check your connection and try again."
    );
  }
}