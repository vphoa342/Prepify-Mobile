import { LRUCache } from "lru-cache";

class GeocodeCache {
    private static instance: GeocodeCache;
    private cache: LRUCache<string, [number, number]>;

    private constructor() {
        this.cache = new LRUCache<string, [number, number]>({
            max: 1000, // Maximum number of entries to keep in the cache
        });
    }

    public static getInstance(): GeocodeCache {
        if (!GeocodeCache.instance) {
            GeocodeCache.instance = new GeocodeCache();
        }
        return GeocodeCache.instance;
    }

    public get(address: string): [number, number] | null {
        return this.cache.get(address) || null;
    }

    public set(address: string, coordinates: [number, number]): void {
        this.cache.set(address, coordinates);
    }

    public has(address: string): boolean {
        return this.cache.has(address);
    }

    public clear(): void {
        this.cache.clear();
    }
}

export default GeocodeCache;
