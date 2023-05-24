import type {OriginName} from '../../Origin/OriginName';
import type {PowerInterface} from '../Power';
import {Power} from '../Power';
import type {OriginPowerName} from './OriginPowerName';

export type OriginPowerInterface<S> = PowerInterface & {
	source: OriginName;
	name: OriginPowerName;
	serialize(): S;
};

export abstract class OriginPower<S> extends Power implements OriginPowerInterface<S> {
	abstract source: OriginName;

	constructor(
		override readonly name: OriginPowerName,
	) {
		super(name, 'origin');
	}

	abstract serialize(): S;
}
