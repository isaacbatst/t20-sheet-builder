import type {SheetInterface} from '../SheetInterface';
import {SkillName} from '../Skill/SkillName';
import {GeneralPower} from './GeneralPower';
import {GeneralPowerNameEnum} from './GeneralPowerName';

export class Dodge extends GeneralPower {
	constructor() {
		super(
			GeneralPowerNameEnum.dodge,
			'passive',
		);
	}

	apply(character: SheetInterface) {
		character.dispatch({type: 'addOtherModifierToDefense', payload: {source: GeneralPowerNameEnum.dodge, value: 2}});
		character.dispatch({type: 'addOtherModifierToSkill', payload: {source: GeneralPowerNameEnum.dodge, value: 2, skill: SkillName.reflexes}});
	}
}
