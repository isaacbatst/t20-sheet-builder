import {ChangeDisplacement} from '../../Action/ChangeDisplacement';
import type {BuildingSheetInterface} from '../../BuildingSheetInterface';
import {RaceName} from '../../Race/RaceName';
import type {Dispatch} from '../../SheetInterface';
import {RaceAbility} from '../RaceAbility';
import {RaceAbilityName} from '../RaceAbilityName';

export class SlowAndAlways extends RaceAbility {
	constructor() {
		super(RaceAbilityName.slowAndAlways, 'passive');
	}

	override addToSheet(sheet: BuildingSheetInterface, dispatch: Dispatch): void {
		super.addToSheet(sheet, dispatch, RaceName.dwarf);
	}

	protected applyEffects(sheet: BuildingSheetInterface, dispatch: Dispatch): void {
		dispatch(new ChangeDisplacement({
			displacement: 6,
			source: this.name,
		}));
	}
}
