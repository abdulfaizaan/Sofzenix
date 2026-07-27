import { Redis } from "@upstash/redis";

export const redis = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) 
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

/**
 * Helper to fetch data from cache, or execute the fetcher and cache the result.
 */
export async function fetchWithCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds: number = 3600
): Promise<T> {
  if (!redis) {
    // Fallback if Redis is not configured
    return await fetcher();
  }

  try {
    const cached = await redis.get<T>(key);
    if (cached) {
      return cached;
    }
  } catch (err) {
    console.error(`Cache read error for key ${key}:`, err);
  }

  const data = await fetcher();

  try {
    if (data) {
      await redis.set(key, data, { ex: ttlSeconds });
    }
  } catch (err) {
    console.error(`Cache write error for key ${key}:`, err);
  }

  return data;
}
