export abstract class Name<T extends string> {
	readonly value: T;

	constructor(name: string) {
		if (!this.isValidName(name)) {
			throw new Error(this.getInvalidMessage());
		}

		this.value = name;
	}

	protected abstract isValidName(value: string): value is T;
	protected abstract getInvalidMessage(): string;
}
