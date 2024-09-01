import {type SerializedOriginPower, type SerializedOriginPowerBasic} from '../../Origin/OriginBenefit/SerializedOriginBenefit';
import type {OriginName} from '../../Origin/OriginName';
import type {PowerInterface} from '../Power';
import {Power} from '../Power';
import {type OriginPowerName} from './OriginPowerName';

export type OriginPowerInterface<S extends SerializedOriginPower = SerializedOriginPower> = PowerInterface & {
	source: OriginName;
	name: OriginPowerName;
	serialize(): S;
};

export abstract class OriginPower<
	S extends SerializedOriginPower = SerializedOriginPower,
> extends Power implements OriginPowerInterface<S> {
	abstract source: OriginName;

	constructor(
		override readonly name: OriginPowerName,
	) {
		super(name, 'origin');
	}

	abstract serialize(): S;

	protected serializeBasic(): SerializedOriginPowerBasic<S['name']> {
		return {
			abilityType: 'power',
			name: this.name,
			effects: this.effects.serialize(),
			type: 'originPower',
		};
	}
}
