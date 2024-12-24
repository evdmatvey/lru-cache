export class Node<T> {
  public data: T;
  public next: Node<T> | null;
  public prev: Node<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

export class DoubleLinkedList<T> {
  public size: number = 0;
  public head: Node<T> | null;
  public tail: Node<T> | null;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  public add(data: T) {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.size += 1;
  }

  public addToFront(data: T) {
    if (!this.head) {
      this.add(data);
    } else {
      const newNode = new Node(data);
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;

      this.size += 1;
    }
  }

  public remove(data: T) {
    let current = this.head;

    while (current) {
      if (current.data === data) {
        if (current.prev) {
          current.prev.next = current.next;
        } else {
          this.head = current.next;
        }

        if (current.next) {
          current.next.prev = current.prev;
        } else {
          this.tail = current.prev;
        }

        this.size -= 1;
        return;
      }
      current = current.next;
    }
  }

  public popBack(): T | null {
    if (this.tail === null) return null;

    const data = this.tail.data;

    if (this.tail.prev) {
      this.tail = this.tail.prev;
    } else {
      this.head = null;
      this.tail = null;
    }

    this.size -= 1;

    return data;
  }
}
