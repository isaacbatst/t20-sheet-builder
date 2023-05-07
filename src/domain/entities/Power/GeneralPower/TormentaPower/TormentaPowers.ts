import {Shell} from './Shell';
import {type TormentaPowerStatic} from './TormentaPowerStatic';

export class TormentaPowers {
	static getAll(): TormentaPowerStatic[] {
		return [
			Shell,
		];
	}
}
