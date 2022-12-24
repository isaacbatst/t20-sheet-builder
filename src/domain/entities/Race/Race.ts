import {ApplyRaceModifiers} from '../Action/ApplyRaceModifiers';
import {ChooseRace} from '../Action/ChooseRace';
import type {Attribute, Attributes} from '../Attributes';
import type {BuildingSheetInterface} from '../Sheet/BuildingSheetInterface';
import type {RaceAbility} from '../RaceAbility/RaceAbility';
import type {RaceInterface} from '../RaceInterface';
import type {Dispatch} from '../Sheet/SheetInterface';
import type {RaceName} from './RaceName';

export abstract class Race implements RaceInterface {
	abstract readonly attributeModifiers: Partial<Attributes>;
	abstract readonly abilities: Record<string, RaceAbility>;

	constructor(readonly name: RaceName) {}

	addToSheet(sheet: BuildingSheetInterface, dispatch: Dispatch): void {
		dispatch(new ChooseRace({race: this}));
		this.applyAttributesModifiers(sheet, dispatch);
		this.applyAbilities(sheet, dispatch);
	}

	private applyAttributesModifiers(sheet: BuildingSheetInterface, dispatch: Dispatch): void {
		const modifiedAttributes: Partial<Attributes> = {};

		Object.entries(this.attributeModifiers).forEach(([attribute, value]) => {
			const attributeCasted = attribute as Attribute;
			modifiedAttributes[attributeCasted] = sheet.getAttributes()[attributeCasted] + value;
		});

		dispatch(new ApplyRaceModifiers({modifiers: this.attributeModifiers, updatedAttributes: modifiedAttributes}));
	}

	private applyAbilities(sheet: BuildingSheetInterface, dispatch: Dispatch): void {
		Object.values(this.abilities).forEach(ability => {
			ability.addToSheet(sheet, dispatch, this.name);
		});
	}
}
