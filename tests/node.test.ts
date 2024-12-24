import { expect, test } from 'vitest';
import { Node } from '../src/linked-list';

test('Next and prev field is null after creating', () => {
  const node = new Node(1);
  expect(node.next).toBeNull();
  expect(node.prev).toBeNull();
});

test('Node different value types', () => {
  const numberNode = new Node(1);
  const stringNode = new Node('string');

  expect(numberNode.data).toBe(1);
  expect(stringNode.data).toBe('string');
});
