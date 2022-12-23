import type {AbilityEffectType} from '../Ability/Ability';
import type {PowerInterface} from '../Power/Power';
import {Power} from '../Power/Power';
import type {RolePowerName} from './RolePowerName';

export type RolePowerInterface = PowerInterface & {
	name: RolePowerName;
};

export abstract class RolePower extends Power implements RolePowerInterface {
	constructor(
		override readonly name: RolePowerName,
		effectType: AbilityEffectType,
	) {
		super(name, effectType, 'role');
	}
}
