import {PassiveEffect} from '../../Ability/PassiveEffect';
import {ChangeDisplacement} from '../../Action/ChangeDisplacement';
import type {BuildingSheetInterface} from '../../BuildingSheetInterface';
import type {Dispatch} from '../../SheetInterface';
import {RaceAbilityName} from '../RaceAbilityName';

export class SlowAndAlwaysEffect extends PassiveEffect {
	constructor() {
		super(RaceAbilityName.slowAndAlways);
	}

	addToSheet(sheet: BuildingSheetInterface, dispatch: Dispatch): void {
		dispatch(new ChangeDisplacement({
			displacement: 6,
			source: this.source,
		}));
	}
}
