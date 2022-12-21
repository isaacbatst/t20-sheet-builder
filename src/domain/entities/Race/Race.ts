import type {Attribute, Attributes} from '../Attributes';
import type {CharacterDispatch, SheetInterface} from '../SheetInterface';
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

		dispatch({type: 'applyRaceModifiers', payload: {modifiers: this.attributeModifiers, updatedAttributes: modifiedAttributes}});
	}

	applyAbilities(character: SheetInterface): void {
		Object.values(this.abilities).forEach(ability => {
			character.dispatch({type: 'applyRaceAbility', payload: {ability}});
		});
	}

	get name() {
		return this.raceName.value;
	}
}
