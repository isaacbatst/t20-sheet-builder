import type {Attribute, Attributes} from '../Attributes';
import type {CharacterDispatch, CharacterInterface} from '../CharacterInterface';
import type {RaceAbility} from '../RaceAbility/RaceAbility';
import type {RaceInterface} from '../RaceInterface';
import {RaceName} from './RaceName';

export abstract class Race implements RaceInterface {
	abstract readonly attributeModifiers: Partial<Attributes>;
	abstract readonly abilities: Record<string, RaceAbility>;
	private readonly raceName: RaceName;

	constructor(name: string) {
		this.raceName = new RaceName(name);
	}

	applyAttributesModifiers(attributes: Attributes, dispatch: CharacterDispatch): void {
		const modifiedAttributes: Partial<Attributes> = {};

		Object.entries(this.attributeModifiers).forEach(([attribute, value]) => {
			const attributeCasted = attribute as Attribute;
			modifiedAttributes[attributeCasted] = attributes[attributeCasted] + value;
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
		});
	}

	get name() {
		return this.raceName.value;
	}
}
