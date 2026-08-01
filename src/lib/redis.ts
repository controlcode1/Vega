import Redis from 'ioredis';

// Singleton Redis Client setup with graceful fallback
const REDIS_URL = process.env.REDIS_URL || process.env.REDIS_HOST;

let redisClient: Redis | null = null;
let isRedisConnected = false;

// Fallback in-memory cache store if Redis service is unreachable
const memoryStore = new Map<string, { value: string; expiresAt: number }>();

if (REDIS_URL) {
  try {
    redisClient = new Redis(REDIS_URL, {
      lazyConnect: true,
      maxRetriesPerRequest: 1,
      enableOfflineQueue: false,
      connectTimeout: 3000,
    });

    redisClient.on('connect', () => {
      isRedisConnected = true;
      console.log('⚡ [Redis] Successfully connected to Redis instance');
    });

    redisClient.on('error', (err) => {
      isRedisConnected = false;
      // Silent warning to avoid cluttering logs when Redis is offline locally
    });

    // Attempt initial async connection
    redisClient.connect().catch(() => {
      isRedisConnected = false;
    });
  } catch (err) {
    redisClient = null;
    isRedisConnected = false;
  }
}

/**
 * Retrieve cached data by key
 */
export async function getCache<T>(key: string): Promise<T | null> {
  // 1. Try Redis
  if (redisClient && isRedisConnected) {
    try {
      const data = await redisClient.get(key);
      if (data) {
        return JSON.parse(data) as T;
      }
      return null;
    } catch (err) {
      isRedisConnected = false;
    }
  }

  // 2. Fallback to in-memory cache
  const cached = memoryStore.get(key);
  if (cached) {
    if (Date.now() > cached.expiresAt) {
      memoryStore.delete(key);
      return null;
    }
    try {
      return JSON.parse(cached.value) as T;
    } catch (e) {
      return null;
    }
  }

  return null;
}

/**
 * Set cache value with TTL in seconds (default 1 hour)
 */
export async function setCache<T>(key: string, value: T, ttlSeconds: number = 3600): Promise<void> {
  const jsonString = JSON.stringify(value);

  // 1. Try Redis
  if (redisClient && isRedisConnected) {
    try {
      await redisClient.set(key, jsonString, 'EX', ttlSeconds);
      return;
    } catch (err) {
      isRedisConnected = false;
    }
  }

  // 2. Fallback to in-memory cache
  memoryStore.set(key, {
    value: jsonString,
    expiresAt: Date.now() + ttlSeconds * 1000,
  });
}

/**
 * Invalidate specific cache key
 */
export async function invalidateCache(key: string): Promise<void> {
  // 1. Clear in-memory
  memoryStore.delete(key);

  // 2. Clear Redis
  if (redisClient && isRedisConnected) {
    try {
      await redisClient.del(key);
    } catch (err) {
      isRedisConnected = false;
    }
  }
}

/**
 * Cache Key Definitions
 */
export const CACHE_KEYS = {
  MENU_DATA: 'vega:menu_data',
};
