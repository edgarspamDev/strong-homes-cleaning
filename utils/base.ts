export const getBase = () => {
  const fallback = './';

  try {
    const raw = (import.meta as any)?.env?.BASE_URL;
    const base = typeof raw === 'string' && raw.length ? raw : fallback;
    return base.endsWith('/') ? base : `${base}/`;
  } catch {
    return fallback;
  }
};

export const buildAssetUrl = (relativePath: string) => {
  const base = getBase();
  const trimmed = relativePath.replace(/^\//, '');
  return `${base}${trimmed}`;
};