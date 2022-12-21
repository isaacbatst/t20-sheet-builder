import {Modifier} from '../Modifier/Modifier';
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
		const modifier = new Modifier(this.name, 2);
		character.dispatch({type: 'addOtherModifierToDefense', payload: {modifier}});
		character.dispatch({type: 'addOtherModifierToSkill', payload: {modifier, skill: SkillName.reflexes}});
	}
}
