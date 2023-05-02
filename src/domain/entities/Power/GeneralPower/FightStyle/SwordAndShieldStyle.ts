import {SkillName} from '../../../Skill';
import {SkillRequirement} from '../../Requirement/SkillRequirement';
import {GeneralPowerName} from '../GeneralPowerName';
import {FightStyle} from './FightStyle';

export class SwordAndShieldStyle extends FightStyle {
	constructor() {
		super(
			GeneralPowerName.swordAndShieldStyle,
		);
		this.addRequirement(new SkillRequirement(SkillName.fight));
	}
}
