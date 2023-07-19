### 배포 사이트
[데모](https://pre-onboarding-11th-search-kko4s2fto-dokimion0.vercel.app/)

### 실행 방법
```
npm install
npm start
```



### API호출별 로컬 캐싱 (Cache Storage)
- 네트워크 요청에 따라 리소스를 캐싱할 경우 Cache Stroage API가 적합
-  요청 결과를 일정 시간 동안 캐시에 저장하고, 만료된 캐시일 경우에만 API로부터 새로운 데이터를 가져와서 캐시를 갱신
  
```tsx
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
    console.log('calling api');
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

```



### 키보드만으로 추천 검색어 이동 기능
- useKeyboard 커스텀 훅
- Enter 키 누를 시 해당 검색어를 검색창에 설정
- 위, 아래 키 누를 시 추천 검색어 이동 

``` tsx
import React, { useState, useRef, KeyboardEvent } from 'react';

type KeyboardProps = {
  currentIndex: number;
  ulRef: React.RefObject<HTMLUListElement>;
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function useKeyboard(
  dataLength: number,
  setKeyword: React.Dispatch<React.SetStateAction<string>>
): KeyboardProps {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const ulRef = useRef<HTMLUListElement>(null);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (dataLength > 0) {
      switch (e.key) {
        case 'ArrowDown':
          setCurrentIndex(currentIndex + 1);
          if (ulRef.current?.childElementCount === currentIndex + 1)
            setCurrentIndex(0);
          break;
        case 'ArrowUp':
          setCurrentIndex(currentIndex - 1);
          if (currentIndex <= 0) {
            setCurrentIndex(ulRef.current!.childElementCount - 1);
          }
          break;
        case 'Enter':
          setCurrentIndex(-1);
          setKeyword(
            ulRef.current?.children[currentIndex].textContent as string
          );
          break;
      }
    }
  };

  return { currentIndex, ulRef, handleKeyPress };
}
```

### 불필요한 API 요청 방지
- useDebounce 커스텀 훅 사용
- 값 입력 후 0.4초 후에 API 호출

```tsx
import { useEffect, useState } from 'react';

const useDebounce = (value: string, delay: number = 400) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;

```
