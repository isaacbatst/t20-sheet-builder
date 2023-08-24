import {Modifiers} from '../Modifier/Modifiers';

type CharacterAttackModifiersConstructorParams = {
	test?: Modifiers;
	damage?: Modifiers;
};

export class CharacterAttackModifiers {
	readonly test: Modifiers;
	readonly damage: Modifiers;

	constructor(params: CharacterAttackModifiersConstructorParams = {}) {
		const {test, damage} = params;

		this.test = test ?? new Modifiers();
		this.damage = damage ?? new Modifiers();
	}
}
