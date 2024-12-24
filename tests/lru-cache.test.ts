import { expect, test } from 'vitest';
import { LruCache } from '../src/lru-cache';

test('LruCache is empty after create', () => {
  const cache = new LruCache<number, number>(4);

  expect(cache.isFull).toBe(false);
  expect(cache.hashMap.size).toBe(0);
});

test('Put items to cache', () => {
  const cache = new LruCache<number, number>(4);
  cache.add(2, 1);
  cache.add(3, 2);
  cache.add(4, 3);

  expect(cache.isFull).toBe(false);
  expect(cache.hashMap.size).toBe(3);
});

test('Full cache', () => {
  const cache = new LruCache<number, number>(4);
  cache.add(2, 1);
  cache.add(3, 2);
  cache.add(4, 3);
  cache.add(5, 4);

  expect(cache.isFull).toBe(true);
});

test('Moving item from back to front', () => {
  const cache = new LruCache<number, number>(4);
  cache.add(2, 1);
  cache.add(3, 2);
  cache.add(4, 3);
  cache.add(5, 4);

  expect(cache.hashMap.size).toBe(4);

  cache.add(2, 1);

  expect(cache.isFull).toBe(true);
  expect(cache.hashMap.size).toBe(4);
});

test('Remove least recently used from cache', () => {
  const cache = new LruCache<number, number>(4);
  cache.add(2, 1);
  cache.add(3, 2);
  cache.add(4, 3);
  cache.add(5, 4);

  expect(cache.hashMap.size).toBe(4);

  cache.add(6, 5);

  expect(cache.isFull).toBe(true);
  expect(cache.hashMap.size).toBe(4);
  expect(cache.hashMap.has(2)).toBe(false);
  expect(cache.hashMap.has(6)).toBe(true);
});

test('Put data to cache with different methods', () => {
  const cache = new LruCache<number, number>(4);
  cache.add(2, 1);
  cache.add(3, 2);
  cache.add(4, 3);

  expect(cache.isFull).toBe(false);
  expect(cache.hashMap.size).toBe(3);

  cache.add(5, 4);

  expect(cache.hashMap.size).toBe(4);

  cache.add(6, 5);

  expect(cache.isFull).toBe(true);
  expect(cache.hashMap.size).toBe(4);
  expect(cache.hashMap.has(2)).toBe(false);
  expect(cache.hashMap.has(6)).toBe(true);

  cache.add(4, 3);

  expect(cache.isFull).toBe(true);
  expect(cache.hashMap.size).toBe(4);

  cache.add(7, 6);

  expect(cache.isFull).toBe(true);
  expect(cache.hashMap.size).toBe(4);
  expect(cache.hashMap.has(3)).toBe(false);
  expect(cache.hashMap.has(7)).toBe(true);
});

test('Get item from cache', () => {
  const cache = new LruCache<number, number>(4);
  cache.add(2, 1);
  cache.add(3, 2);

  const data = cache.get(3);

  expect(data).toBe(2);
  expect(cache.isFull).toBe(false);
  expect(cache.hashMap.size).toBe(2);
});

test('Example of usage', () => {
  const cache = new LruCache<number, number>(4);
  cache.add(2, 1);
  cache.add(3, 2);

  expect(cache.get(3)).toBe(2);
  expect(cache.isFull).toBe(false);
  expect(cache.hashMap.size).toBe(2);

  cache.add(4, 3);
  cache.add(5, 4);
  cache.add(6, 5);
  cache.add(7, 6);
  cache.add(8, 7);

  expect(cache.isFull).toBe(true);
  expect(cache.hashMap.has(2)).toBe(false);
  expect(cache.hashMap.has(3)).toBe(false);
  expect(cache.hashMap.has(4)).toBe(false);

  expect(cache.get(9)).toBeUndefined();

  cache.add(9, 8);

  expect(cache.get(9)).toBe(8);
});

test('Should evict the least recently used item', () => {
  const cache = new LruCache<number, number>(3);
  cache.add(1, 1);
  cache.add(2, 2);
  cache.add(3, 3);

  expect(cache.get(1)).toBe(1);
  cache.add(4, 4);

  expect(cache.get(2)).toBeUndefined();
});

test('Should update the value of an existing key', () => {
  const cache = new LruCache<number, number>(2);
  cache.add(1, 1);
  cache.add(2, 2);

  expect(cache.get(1)).toBe(1);
  cache.add(1, 10);

  expect(cache.get(1)).toBe(10);
});
