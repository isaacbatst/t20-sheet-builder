import {LearnCircle} from '../../Action/LearnCircle';
import type {BuildingSheetInterface} from '../../BuildingSheetInterface';
import type {Levels} from '../../Levels';
import type {Dispatch} from '../../SheetInterface';
import {SpellCircle} from '../../Spell/SpellCircle';
import {RoleAbilityName} from '../RoleAbilityName';
import {RoleAbilityPassive} from '../RoleAbilityPassive';

export class ArcanistSpells extends RoleAbilityPassive {
	constructor(readonly level: Levels) {
		super(RoleAbilityName.arcanistSpells);
	}

	applyEffects(sheet: BuildingSheetInterface, dispatch: Dispatch): void {
		dispatch(new LearnCircle({circle: SpellCircle.first, source: this.name}));
	}
}
