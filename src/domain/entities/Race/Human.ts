import {Versatile} from '../Ability/Versatile';
import type {Attribute} from '../Attributes';
import type {SkilledCharacter} from '../Character';
import {SelectableAttributesRace} from '../SelectableAttributesRace';

export class Human extends SelectableAttributesRace {
	readonly abilities = {
		versatile: new Versatile(),
	};

	constructor(attributes: Attribute[], versatileChoices: Array<{type: 'skill' | 'power'; name: string}> = []) {
		super(attributes);

		versatileChoices.forEach(choice => {
			this.abilities.versatile.addChoice(choice);
		});
	}

	protected get restrictedAttributes(): string[] {
		return [];
	}

	protected get fixedModifier(): number {
		return 1;
	}

	protected get selectableQuantity(): number {
		return 3;
	}

	get versatileChoices() {
		return this.abilities.versatile.choices;
	}

	applyAbilities(character: SkilledCharacter): void {
		Object.values(this.abilities).forEach(ability => {
			ability.apply(character);
		});
	}
}
