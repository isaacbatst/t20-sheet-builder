import {type ShieldName} from './ShieldName';
import {Shields} from './Shields';

export class ShieldFactory {
	static make(name: ShieldName) {
		return new (Shields.map[name])();
	}
}
