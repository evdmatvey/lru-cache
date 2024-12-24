import { DoubleLinkedList } from './linked-list';

export class LruCache<K, T> {
  public isFull: boolean;
  public hashMap: Map<K, T> = new Map<K, T>();

  private _size: number;
  private _list: DoubleLinkedList<T> = new DoubleLinkedList<T>();

  constructor(size: number) {
    this._size = size;
    this.isFull = false;
  }

  public get(key: K): T | undefined {
    const data = this.hashMap.get(key);

    if (data) this._moveItemAtList(key, data);

    return data;
  }

  public add(key: K, data: T) {
    if (this.hashMap.has(key)) {
      return this._moveItemAtList(key, data);
    }

    if (!this.isFull) {
      return this._pushDataToList(key, data);
    }

    this._removeLeastRecentlyUsedItem(key, data);
  }

  private _pushDataToList(key: K, data: T) {
    this._list.addToFront(data);
    this.hashMap.set(key, data);

    if (this._size === this.hashMap.size) this.isFull = true;
  }

  private _removeLeastRecentlyUsedItem(key: K, data: T) {
    const leastRecentlyUsed = this._list.popBack();

    if (!leastRecentlyUsed) return;

    const leastRecentlyUsedKey = this._getKeyByValue(leastRecentlyUsed);

    if (!leastRecentlyUsedKey) return;

    this._list.addToFront(data);

    this.hashMap.delete(leastRecentlyUsedKey);
    this.hashMap.set(key, data);
  }

  private _moveItemAtList(key: K, data: T) {
    this._list.remove(data);
    this._list.addToFront(data);
    this.hashMap.set(key, data);
  }

  private _getKeyByValue(data: T): K | null {
    for (const k of this.hashMap.keys()) if (this.hashMap.get(k) === data) return k;

    return null;
  }
}
