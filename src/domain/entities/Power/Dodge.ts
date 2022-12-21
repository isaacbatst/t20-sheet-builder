import {Modifier} from '../Modifier/Modifier';
import type {SheetInterface} from '../SheetInterface';
import {SkillName} from '../Skill/SkillName';
import {GeneralPower} from './GeneralPower';
import {GeneralPowerNameEnum} from './GeneralPowerName';
import type {Requirement} from './Power';

export class Dodge extends GeneralPower {
	private static readonly requirement: Requirement = {
		description: 'Des 1',
		verify: sheet => sheet.getAttributes().dexterity >= 1,
	};

	constructor() {
		super(
			GeneralPowerNameEnum.dodge,
			'passive',
		);
		super.addRequirement(Dodge.requirement);
	}

	apply(sheet: SheetInterface) {
		super.verifyRequirements(sheet);

		const modifier = new Modifier(this.name, 2);
		sheet.dispatch({type: 'addOtherModifierToDefense', payload: {modifier}});
		sheet.dispatch({type: 'addOtherModifierToSkill', payload: {modifier, skill: SkillName.reflexes}});
	}
}
