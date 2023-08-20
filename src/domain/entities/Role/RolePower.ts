import type {PowerInterface} from '../Power/Power';
import {Power} from '../Power/Power';
import {type SerializedSheetRolePower} from '../Sheet/SerializedSheet/SerializedSheetInterface';
import type {RolePowerName} from './RolePowerName';

export type RolePowerInterface = PowerInterface & {
	name: RolePowerName;
	serialize(): SerializedSheetRolePower;
};

export abstract class RolePower extends Power implements RolePowerInterface {
	constructor(
		override readonly name: RolePowerName,
	) {
		super(name, 'role');
	}

	serialize(): SerializedSheetRolePower {
		return {
			name: this.name,
			abilityType: this.abilityType,
			effects: this.effects.serialize(),
		};
	}
}
