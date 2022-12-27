export type Queue<T> = {
	enqueue(item: T): void;
	dequeue(): T;
	getSize(): number;
};
