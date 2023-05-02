import {SkillName} from '../../../Skill';
import {SkillRequirement} from '../../Requirement/SkillRequirement';
import {GeneralPowerName} from '../GeneralPowerName';
import {FightStyle} from './FightStyle';

export class OneWeaponStyle extends FightStyle {
	constructor() {
		super(
			GeneralPowerName.oneWeaponStyle,
		);
		this.addRequirement(new SkillRequirement(SkillName.fight));
	}
}
