import type {Attribute} from '../Attributes';
import type {CharacterInterface} from '../CharacterInterface';
import type {VersatileChoice} from '../RaceAbility/Versatile';
import {Versatile} from '../RaceAbility/Versatile';
import {SelectableAttributesRace} from '../SelectableAttributesRace';
import {RaceNameEnum} from './RaceName';

export class Human extends SelectableAttributesRace {
	readonly abilities = {
		versatile: new Versatile(),
	};

	constructor(attributes: Attribute[], versatileChoices: VersatileChoice[] = []) {
		super(attributes, RaceNameEnum.human);

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

	applyAbilities(character: CharacterInterface): void {
		Object.values(this.abilities).forEach(ability => {
			ability.apply(character);
		});
	}
}
