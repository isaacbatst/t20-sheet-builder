import {TriggeredEffectName} from '../../../Ability/TriggeredEffectName';
import {SpecialAttackEffect} from './SpecialAttackEffect';
import {SpecialAttackManaCost} from './SpecialAttackManaCost';

export class SpecialAttackEffectPlusFour extends SpecialAttackEffect {
	constructor() {
		super(new SpecialAttackManaCost(2), TriggeredEffectName.specialAttackPlusEight);
	}
}
