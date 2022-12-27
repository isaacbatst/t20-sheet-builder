import {PassiveEffect} from '../Ability/PassiveEffect';
import {AddFixedModifierToDefense} from '../Action/AddFixedModifierToDefense';
import {AddFixedModifierToSkill} from '../Action/AddFixedModifierToSkill';
import {FixedModifier} from '../Modifier/FixedModifier/FixedModifier';
import type {BuildingSheetInterface} from '../Sheet/BuildingSheetInterface';
import type {Dispatch} from '../Sheet/SheetInterface';
import {SkillName} from '../Skill/SkillName';
import {GeneralPowerName} from './GeneralPowerName';

export class DodgeEffect extends PassiveEffect {
	constructor() {
		super(GeneralPowerName.dodge);
	}

	addToSheet(sheet: BuildingSheetInterface, dispatch: Dispatch): void {
		const modifier = new FixedModifier(this.source, 2);
		dispatch(new AddFixedModifierToDefense({modifier}));
		dispatch(new AddFixedModifierToSkill({modifier, skill: SkillName.reflexes}));
	}
}
