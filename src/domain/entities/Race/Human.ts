import type {Attribute} from '../Attributes';
import {Versatile} from '../RaceAbility/Human/Versatile';
import type {VersatileChoice} from '../RaceAbility/Human/VersatileChoice';
import {SelectableAttributesRace} from '../SelectableAttributesRace';
import {RaceName} from './RaceName';

export class Human extends SelectableAttributesRace {
	readonly abilities = {
		versatile: new Versatile(),
	};

	/**
 * Returns an instance of Human race.
 * @param selectedAttributes - 3 different attributes
 * @param versatileChoices - 2 skills or 1 skill and 1 general power
  **/

	constructor(selectedAttributes: Attribute[], versatileChoices: VersatileChoice[] = []) {
		super(selectedAttributes, RaceName.human);

		versatileChoices.forEach(choice => {
			this.abilities.versatile.addChoice(choice);
		});
	}

	addVersatilChoice(choice: VersatileChoice) {
		this.abilities.versatile.addChoice(choice);
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
		return this.abilities.versatile.effects.default.choices;
	}
}
