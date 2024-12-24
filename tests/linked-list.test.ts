import { expect, test } from 'vitest';
import { DoubleLinkedList } from '../src/linked-list';

test('List is empty after creating', () => {
  const list = new DoubleLinkedList<number>();
  expect(list.head).toBeNull();
  expect(list.size).toBe(0);
});

test('Add to empty list', () => {
  const list = new DoubleLinkedList<number>();
  list.add(1);

  expect(list.head?.data).toBe(1);
  expect(list.head?.next).toBeNull();
  expect(list.tail?.data).toBe(1);
  expect(list.tail?.prev).toBeNull();
  expect(list.size).toBe(1);
});

test('Add to list', () => {
  const list = new DoubleLinkedList<number>();
  list.add(1);
  list.add(2);

  expect(list.head?.data).toBe(1);
  expect(list.head?.next?.data).toBe(2);
  expect(list.head?.next?.next).toBeNull();
  expect(list.tail?.data).toBe(2);
  expect(list.tail?.prev?.data).toBe(1);
  expect(list.tail?.prev?.prev).toBeNull();
  expect(list.size).toBe(2);
});

test('AddToFront to empty list', () => {
  const list = new DoubleLinkedList<number>();
  list.addToFront(1);

  expect(list.head?.data).toBe(1);
  expect(list.head?.next).toBeNull();
  expect(list.tail?.data).toBe(1);
  expect(list.tail?.prev).toBeNull();
  expect(list.size).toBe(1);
});

test('AddToFront to list', () => {
  const list = new DoubleLinkedList<number>();

  list.addToFront(1);
  expect(list.head?.data).toBe(1);
  expect(list.tail?.data).toBe(1);

  list.addToFront(2);
  expect(list.head?.data).toBe(2);
  expect(list.tail?.prev?.data).toBe(2);
  expect(list.tail?.data).toBe(1);
  expect(list.head?.next?.data).toBe(1);

  expect(list.head?.next?.next).toBeNull();
  expect(list.tail?.prev?.prev).toBeNull();
  expect(list.size).toBe(2);
});

test('Remove from empty list', () => {
  const list = new DoubleLinkedList<number>();
  list.remove(1);

  expect(list.size).toBe(0);
  expect(list.head).toBeNull();
  expect(list.tail).toBeNull();
});

test('Remove from list', () => {
  const list = new DoubleLinkedList<number>();
  list.add(1);
  list.remove(1);

  expect(list.size).toBe(0);
  expect(list.head).toBeNull();
  expect(list.tail).toBeNull();
});

test('Remove several items from list', () => {
  const list = new DoubleLinkedList<number>();
  list.add(1);
  list.add(2);
  list.add(3);
  list.remove(1);

  expect(list.size).toBe(2);
  expect(list.head?.data).toBe(2);
  expect(list.head?.next?.data).toBe(3);
  expect(list.head?.next?.next).toBeNull();
  expect(list.tail?.data).toBe(3);
  expect(list.tail?.prev?.data).toBe(2);
  expect(list.tail?.prev?.prev).toBeNull();
});

test('RemoveFromBack from empty list', () => {
  const list = new DoubleLinkedList<number>();
  list.popBack();

  expect(list.size).toBe(0);
  expect(list.head).toBeNull();
  expect(list.tail).toBeNull();
});

test('RemoveFromBack from list', () => {
  const list = new DoubleLinkedList<number>();
  list.add(1);
  const data = list.popBack();

  expect(list.size).toBe(0);
  expect(list.head).toBeNull();
  expect(list.tail).toBeNull();
  expect(data).toBe(1);
});
