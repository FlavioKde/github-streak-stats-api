const cache = new Map();
const CACHE_DURATION = 60 * 60 * 1000; 

export function getCachedLanguages(username) {
    const cachedData = cache.get(username);

    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
        return cachedData.data;
    }
    return null;
}

export function setCachedLanguages(username, data) {
    cache.set(username, {
        data,
        timestamp: Date.now()
    });
}
