import {Shield} from './Shield';
import {type ShieldName} from './ShieldName';

export class ShieldFactory {
	static make(name: ShieldName) {
		return new Shield(name);
	}
}
