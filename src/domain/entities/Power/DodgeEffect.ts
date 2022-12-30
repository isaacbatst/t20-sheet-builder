import {PassiveEffect} from '../Ability/PassiveEffect';
import {AddFixedModifierToDefense} from '../Action/AddFixedModifierToDefense';
import {AddFixedModifierToSkill} from '../Action/AddFixedModifierToSkill';
import {FixedModifier} from '../Modifier/FixedModifier/FixedModifier';
import type {SheetBaseInterface} from '../Sheet/SheetBaseInterface';
import type {Dispatch} from '../Sheet/Transaction';
import {SkillName} from '../Skill/SkillName';
import {GeneralPowerName} from './GeneralPowerName';

export class DodgeEffect extends PassiveEffect {
	constructor() {
		super(GeneralPowerName.dodge);
	}

	applyToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void {
		const modifier = new FixedModifier(this.source, 2);
		dispatch(new AddFixedModifierToDefense({modifier}), sheet);
		dispatch(new AddFixedModifierToSkill({modifier, skill: SkillName.reflexes}), sheet);
	}
}
