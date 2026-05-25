import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface Asset {
  id: string;
  name: string;
  type: "sprite" | "background" | "character" | "meme";
  url: string;
  thumbnailUrl: string | null;
  tags: string[] | null;
  public: boolean;
  authorId: string;
  createdAt: string;
}

export function useAssets() {
  return useQuery<Asset[]>({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await fetch("/api/assets");
      if (!res.ok) throw new Error("Failed to load assets");
      return res.json();
    },
  });
}

export function useUploadAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { file: File; name: string; type: string }) => {
      const formData = new FormData();
      formData.append("file", data.file);
      formData.append("name", data.name);
      formData.append("type", data.type);

      const res = await fetch("/api/assets/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Upload failed" }));
        throw new Error(err.message || "Upload failed");
      }
      return res.json() as Promise<Asset>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
    },
  });
}

export function useDeleteAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/assets/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
    },
  });
}
