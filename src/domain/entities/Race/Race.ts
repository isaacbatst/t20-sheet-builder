import type {Ability} from '../Ability';
import type {Attribute, Attributes} from '../Attributes';
import type {CharacterInterface} from '../Character';
import {RaceName} from './RaceName';
import type {RaceInterface} from '../RaceInterface';

export type AttributeModifier = {
	attribute: Attribute;
	modifier: number;
};

export abstract class Race implements RaceInterface {
	abstract readonly attributeModifiers: AttributeModifier[];
	abstract readonly abilities: Record<string, Ability>;
	private readonly raceName: RaceName;

	constructor(name: string) {
		this.raceName = new RaceName(name);
	}

	applyAttributesModifiers(attributes: Attributes): Attributes {
		const modifiedAttributes: Partial<Attributes> = {};

		this.attributeModifiers.forEach(attributeModifier => {
			modifiedAttributes[attributeModifier.attribute] = attributes[attributeModifier.attribute] + attributeModifier.modifier;
		});

		return {
			...attributes,
			...modifiedAttributes,
		};
	}

	applyAbilities(character: CharacterInterface): void {
		Object.values(this.abilities).forEach(ability => {
			ability.apply(character);
		});
	}

	get name() {
		return this.raceName.value;
	}
}
