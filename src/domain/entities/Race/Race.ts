import type {Attribute, Attributes} from '../Attributes';
import type {RaceAbility} from '../RaceAbility/RaceAbility';
import type {RaceInterface} from '../RaceInterface';
import type {Dispatch, SheetInterface} from '../SheetInterface';
import type {RaceName} from './RaceName';

export abstract class Race implements RaceInterface {
	abstract readonly attributeModifiers: Partial<Attributes>;
	abstract readonly abilities: Record<string, RaceAbility>;

	constructor(readonly name: RaceName) {}

	applyAttributesModifiers(attributes: Attributes, dispatch: Dispatch): void {
		const modifiedAttributes: Partial<Attributes> = {};

		Object.entries(this.attributeModifiers).forEach(([attribute, value]) => {
			const attributeCasted = attribute as Attribute;
			modifiedAttributes[attributeCasted] = attributes[attributeCasted] + value;
		});

		dispatch({type: 'applyRaceModifiers', payload: {modifiers: this.attributeModifiers, updatedAttributes: modifiedAttributes}});
	}

	applyAbilities(sheet: SheetInterface): void {
		Object.values(this.abilities).forEach(ability => {
			sheet.dispatch({type: 'applyRaceAbility', payload: {ability}});
		});
	}
}
