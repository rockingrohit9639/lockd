const cache = new Map<string, ImageBitmap>();
const loading = new Map<string, Promise<ImageBitmap>>();

export async function loadSprite(url: string): Promise<ImageBitmap> {
  const cached = cache.get(url);
  if (cached) return cached;

  const pending = loading.get(url);
  if (pending) return pending;

  const promise = fetch(url)
    .then((res) => res.blob())
    .then((blob) => createImageBitmap(blob))
    .then((bitmap) => {
      cache.set(url, bitmap);
      loading.delete(url);
      return bitmap;
    });

  loading.set(url, promise);
  return promise;
}

export function getSprite(url: string): ImageBitmap | null {
  return cache.get(url) ?? null;
}

export function preloadSprites(urls: string[]): Promise<ImageBitmap[]> {
  return Promise.all(urls.map(loadSprite));
}
