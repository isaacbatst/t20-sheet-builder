import {Shell} from './Shell';
import {type TormentaPowerStatic} from './TormentaPowerStatic';

export class TormentaPowers {
	static readonly map = {
		shell: Shell,
	};

	static getAll(): TormentaPowerStatic[] {
		return Object.values(TormentaPowers.map);
	}
}
