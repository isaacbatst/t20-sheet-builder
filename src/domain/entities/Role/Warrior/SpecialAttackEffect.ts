import {TriggeredEffect} from '../../Ability/TriggeredEffect';
import {RoleAbilityName} from '../RoleAbilityName';
import type {SpecialAttackManaCost} from './SpecialAttackManaCost';

export abstract class SpecialAttackEffect extends TriggeredEffect {
	constructor(
		override cost: SpecialAttackManaCost,
	) {
		super({
			duration: 'next',
			execution: 'reaction',
			source: RoleAbilityName.specialAttack,
			triggerEvent: 'attack',
		});
	}
}
