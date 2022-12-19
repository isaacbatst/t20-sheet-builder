import {Versatile} from '../Ability/Versatile';
import type {Character} from '../Character';
import {SelectableAttributesRace} from '../SelectableAttributesRace';

export class Human extends SelectableAttributesRace {
	readonly abilities = {
		versatile: new Versatile(),
	};

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

	addVersatileChoice(choice: {type: 'skill' | 'power'; name: string}) {
		this.abilities.versatile.addChoice(choice);
	}
}
