import {AddOtherModifierToDefense} from '../Action/AddOtherModifierToDefense';
import {AddOtherModifierToSkill} from '../Action/AddOtherModifierToSkill';
import type {BuildingSheetInterface} from '../BuildingSheetInterface';
import {Modifier} from '../Modifier/Modifier';
import {SkillName} from '../Skill/SkillName';
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

	apply(sheet: BuildingSheetInterface) {
		super.verifyRequirements(sheet);

		const modifier = new Modifier(this.name, 2);
		sheet.dispatch(new AddOtherModifierToDefense({modifier}));
		sheet.dispatch(new AddOtherModifierToSkill({modifier, skill: SkillName.reflexes}));
	}
}
