import {PassiveEffect} from '../../Ability/PassiveEffect';
import {AddPerLevelModifierToLifePoints} from '../../Action/AddPerLevelModifierToLifePoints';
import type {BuildingSheetInterface} from '../../BuildingSheetInterface';
import {PerLevelModifier} from '../../Modifier/PerLevelModifier';
import type {Dispatch} from '../../Sheet/SheetInterface';
import {RaceAbilityName} from '../RaceAbilityName';

export class HardAsRockPerLevelEffect extends PassiveEffect {
	constructor() {
		super(RaceAbilityName.hardAsRock);
	}

	addToSheet(sheet: BuildingSheetInterface, dispatch: Dispatch): void {
		dispatch(new AddPerLevelModifierToLifePoints({
			modifier: new PerLevelModifier(1, true, this.source),
		}));
	}
}
