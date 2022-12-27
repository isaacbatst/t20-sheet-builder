import {PassiveEffect} from '../../Ability/PassiveEffect';
import {AddFixedModifierToLifePoints} from '../../Action/AddFixedModifierToLifePoints';
import {FixedModifier} from '../../Modifier/FixedModifier/FixedModifier';
import type {BuildingSheetInterface} from '../../Sheet/BuildingSheetInterface';
import type {Dispatch} from '../../Sheet/SheetInterface';
import {RaceAbilityName} from '../RaceAbilityName';

export class HardAsRockInitialEffect extends PassiveEffect {
	constructor() {
		super(RaceAbilityName.hardAsRock);
	}

	addToSheet(sheet: BuildingSheetInterface, dispatch: Dispatch): void {
		const modifier = new FixedModifier(this.source, 3);
		dispatch(new AddFixedModifierToLifePoints({modifier}));
	}
}
