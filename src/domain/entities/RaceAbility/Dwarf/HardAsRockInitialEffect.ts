import {PassiveEffect} from '../../Ability/PassiveEffect';
import {AddModifierToLifePoints} from '../../Action/AddModifierToLifePoints';
import type {BuildingSheetInterface} from '../../BuildingSheetInterface';
import {Modifier} from '../../Modifier/Modifier';
import type {Dispatch} from '../../Sheet/SheetInterface';
import {RaceAbilityName} from '../RaceAbilityName';

export class HardAsRockInitialEffect extends PassiveEffect {
	constructor() {
		super(RaceAbilityName.hardAsRock);
	}

	addToSheet(sheet: BuildingSheetInterface, dispatch: Dispatch): void {
		const modifier = new Modifier(this.source, 3);
		dispatch(new AddModifierToLifePoints({modifier}));
	}
}
