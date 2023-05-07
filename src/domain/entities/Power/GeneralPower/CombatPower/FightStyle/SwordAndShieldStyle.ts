import {type CharacterAppliedFightStyle} from '../../../../Character/CharacterAppliedFightStyle';
import {type CharacterModifiers} from '../../../../Character/CharacterModifiers';
import {SheetBuilderError} from '../../../../Error';
import {SkillName} from '../../../../Skill';
import {SkillRequirement} from '../../../Requirement/SkillRequirement';
import {GeneralPowerName} from '../../GeneralPowerName';
import {FightStyle} from './FightStyle';

export class SwordAndShieldStyle extends FightStyle {
	constructor() {
		super(
			GeneralPowerName.swordAndShieldStyle,
		);
		this.addRequirement(new SkillRequirement(SkillName.fight));
	}

	applyModifiers(modifiers: CharacterModifiers): CharacterAppliedFightStyle {
		throw new SheetBuilderError('Method not implemented.');
	}
}
