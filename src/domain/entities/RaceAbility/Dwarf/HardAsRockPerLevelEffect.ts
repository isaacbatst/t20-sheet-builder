import {PassiveEffect} from '../../Ability/PassiveEffect';
import {AddPerLevelModifierToLifePoints} from '../../Action/AddPerLevelModifierToLifePoints';
import type {BuildingSheetInterface} from '../../Sheet/BuildingSheetInterface';
import {PerLevelModifier} from '../../Modifier/PerLevelModifier/PerLevelModifier';
import type {Dispatch} from '../../Sheet/SheetInterface';
import {RaceAbilityName} from '../RaceAbilityName';

export class HardAsRockPerLevelEffect extends PassiveEffect {
	constructor() {
		super(RaceAbilityName.hardAsRock);
	}

	addToSheet(sheet: BuildingSheetInterface, dispatch: Dispatch): void {
		dispatch(new AddPerLevelModifierToLifePoints({
			modifier: new PerLevelModifier(this.source, 1, false),
		}));
	}
}
