import {AddModifierToLifePoints} from '../../Action/AddModifierToLifePoints';
import type {BuildingSheetInterface} from '../../BuildingSheetInterface';
import {Modifier} from '../../Modifier/Modifier';
import {RaceName} from '../../Race/RaceName';
import type {Dispatch} from '../../SheetInterface';
import {RaceAbility} from '../RaceAbility';
import {RaceAbilityName} from '../RaceAbilityName';

export class HardAsRock extends RaceAbility {
	constructor() {
		super(RaceAbilityName.hardAsRock, 'passive');
	}

	override addToSheet(sheet: BuildingSheetInterface, dispatch: Dispatch): void {
		super.addToSheet(sheet, dispatch, RaceName.dwarf);
	}

	protected applyEffects(sheet: BuildingSheetInterface, dispatch: Dispatch): void {
		const modifier = new Modifier(this.name, 3);
		dispatch(new AddModifierToLifePoints({modifier}));
	}
}
