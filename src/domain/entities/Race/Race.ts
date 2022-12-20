import type {Ability} from '../Ability';
import type {Attribute, Attributes} from '../Attributes';
import type {CharacterDispatch, CharacterInterface} from '../CharacterInterface';
import {RaceName} from './RaceName';
import type {RaceInterface} from '../RaceInterface';
import type {RaceAbility} from '../RaceAbility/RaceAbility';

export type AttributeModifier = {
	attribute: Attribute;
	modifier: number;
};

export abstract class Race implements RaceInterface {
	abstract readonly attributeModifiers: AttributeModifier[];
	abstract readonly abilities: Record<string, RaceAbility>;
	private readonly raceName: RaceName;

	constructor(name: string) {
		this.raceName = new RaceName(name);
	}

	applyAttributesModifiers(attributes: Attributes, dispatch: CharacterDispatch): void {
		const modifiedAttributes: Partial<Attributes> = {};

		this.attributeModifiers.forEach(attributeModifier => {
			modifiedAttributes[attributeModifier.attribute] = attributes[attributeModifier.attribute] + attributeModifier.modifier;
		});

		const updatedAttributes = {
			...attributes,
			...modifiedAttributes,
		};

		dispatch({type: 'applyRaceModifiers', payload: {modifiers: this.attributeModifiers, updatedAttributes}});
	}

	applyAbilities(character: CharacterInterface): void {
		Object.values(this.abilities).forEach(ability => {
			character.dispatch({type: 'applyAbility', payload: {name: ability.name}});
			ability.apply(character);
		});
	}

	get name() {
		return this.raceName.value;
	}
}
