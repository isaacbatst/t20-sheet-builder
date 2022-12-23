import {AddOtherModifierToDefense} from '../Action/AddOtherModifierToDefense';
import {AddOtherModifierToSkill} from '../Action/AddOtherModifierToSkill';
import type {BuildingSheetInterface} from '../BuildingSheetInterface';
import {Modifier} from '../Modifier/Modifier';
import type {Dispatch} from '../SheetInterface';
import {SkillName} from '../Skill/SkillName';
import type {Translatable} from '../Translator';
import {GeneralPower} from './GeneralPower';
import {GeneralPowerName} from './GeneralPowerName';
import type {Requirement} from './Power';

export class Dodge extends GeneralPower {
	private static readonly requirement: Requirement = {
		description: 'Des 1',
		verify: sheet => sheet.getAttributes().dexterity >= 1,
	};

	constructor() {
		super(
			GeneralPowerName.dodge,
			'passive',
		);
		super.addRequirement(Dodge.requirement);
	}

	applyEffects(sheet: BuildingSheetInterface, dispatch: Dispatch) {
		const modifier = new Modifier(this.name, 2);
		dispatch(new AddOtherModifierToDefense({modifier}));
		dispatch(new AddOtherModifierToSkill({modifier, skill: SkillName.reflexes}));
	}
}
