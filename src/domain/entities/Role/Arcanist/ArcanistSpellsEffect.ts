import {PassiveEffect} from '../../Ability/PassiveEffect';
import {LearnCircle} from '../../Action/LearnCircle';
import type {BuildingSheetInterface} from '../../BuildingSheetInterface';
import type {Dispatch} from '../../Sheet/SheetInterface';
import {SpellCircle} from '../../Spell/SpellCircle';
import {RoleAbilityName} from '../RoleAbilityName';

export class ArcanistSpellsEffect extends PassiveEffect {
	constructor() {
		super(RoleAbilityName.arcanistSpells);
	}

	addToSheet(sheet: BuildingSheetInterface, dispatch: Dispatch): void {
		dispatch(new LearnCircle({circle: SpellCircle.first, source: this.source}));
	}
}
