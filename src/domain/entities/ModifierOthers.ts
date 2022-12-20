type Modifier = {
	sourceName: string;
	value: number;
};

export class ModifierOthers {
	readonly modifiers: Modifier[] = [];
	constructor(private readonly modifierRepeatedError: string) {}

	getTotal() {
		const total = this.modifiers
			.reduce<number>((acc, modifier) => modifier.value + acc, 0);

		return total;
	}

	add(newModifier: Modifier) {
		const isRepeated = this.modifiers.some(otherModifier => otherModifier.sourceName === newModifier.sourceName);

		if (isRepeated) {
			throw new Error(this.modifierRepeatedError);
		}

		this.modifiers.push(newModifier);
	}
}
