import {PassiveEffect} from '../Ability/PassiveEffect';
import {AddOtherModifierToDefense} from '../Action/AddOtherModifierToDefense';
import {AddOtherModifierToSkill} from '../Action/AddOtherModifierToSkill';
import type {BuildingSheetInterface} from '../BuildingSheetInterface';
import {Modifier} from '../Modifier/Modifier';
import type {Dispatch} from '../SheetInterface';
import {SkillName} from '../Skill/SkillName';
import {GeneralPowerName} from './GeneralPowerName';

export class DodgeEffect extends PassiveEffect {
	constructor() {
		super(GeneralPowerName.dodge);
	}

	addToSheet(sheet: BuildingSheetInterface, dispatch: Dispatch): void {
		const modifier = new Modifier(this.source, 2);
		dispatch(new AddOtherModifierToDefense({modifier}));
		dispatch(new AddOtherModifierToSkill({modifier, skill: SkillName.reflexes}));
	}
}
