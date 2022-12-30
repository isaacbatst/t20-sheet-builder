import {TriggeredEffectName} from '../../../Ability/TriggeredEffectName';
import {SpecialAttackEffect} from './SpecialAttackEffect';

export class SpecialAttackEffectPlusFour extends SpecialAttackEffect {
	constructor() {
		super(2, TriggeredEffectName.specialAttackPlusEight);
	}
}
