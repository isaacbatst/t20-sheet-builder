import {PassiveEffect} from '../../../Ability/PassiveEffect';
import {AddPerLevelModifierToLifePoints} from '../../../Action/AddPerLevelModifierToLifePoints';
import type {SheetBaseInterface} from '../../../Sheet/SheetBaseInterface';
import {PerLevelModifier} from '../../../Modifier/PerLevelModifier/PerLevelModifier';
import type {Dispatch} from '../../../Sheet/Transaction';
import {RaceAbilityName} from '../../RaceAbilityName';

export class HardAsRockPerLevelEffect extends PassiveEffect {
	constructor() {
		super(RaceAbilityName.hardAsRock);
	}

	applyToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void {
		dispatch(new AddPerLevelModifierToLifePoints({
			modifier: new PerLevelModifier(this.source, 1, false),
		}), sheet);
	}
}
