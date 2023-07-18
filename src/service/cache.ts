const HEADER_FETCH_DATE = 'fetch-date';
const EXPIRE_TIME = 10 * 60 * 1000;

export class CacheApiServer {
  private static cacheStorage = 'CACHE_STORAGE';

  static async getSearchByQuery(search: string) {
    const url = `http://localhost:4000/sick?q=${search}`;
    const cache = await caches.open(this.cacheStorage);

    return await this.getValidResponse(cache, url);
  }

  private static async getValidResponse(cache: Cache, url: string) {
    const cacheResponse = await caches.match(url);

    return cacheResponse && !this.isCacheExpired(cacheResponse)
      ? await cacheResponse.json()
      : await this.getFetchResponse(cache, url);
  }

  private static async getFetchResponse(cache: Cache, url: string) {
    const fetchResponse = await fetch(url);
    console.info('calling api');
    const newResponse = await this.getResponseWithFetchDate(fetchResponse);
    cache.put(url, newResponse);
    return fetchResponse.json();
  }

  private static async getResponseWithFetchDate(fetchResponse: Response) {
    const cloneResponse = fetchResponse.clone();
    const newBody = await cloneResponse.blob();
    let newHeaders = new Headers(cloneResponse.headers);
    newHeaders.append(HEADER_FETCH_DATE, new Date().toISOString());

    return new Response(newBody, {
      status: cloneResponse.status,
      statusText: cloneResponse.statusText,
      headers: newHeaders,
    });
  }

  private static isCacheExpired(cacheResponse: Response) {
    const fetchDate = new Date(
      cacheResponse.headers.get(HEADER_FETCH_DATE)!
    ).getTime();
    const today = new Date().getTime();

    return today - fetchDate > EXPIRE_TIME;
  }
}
