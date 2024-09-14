import {Shield} from './Shield';
import {type ShieldName} from './ShieldName';

export class ShieldFactory {
	static make<N extends ShieldName>(name: N): Shield<N> {
		return new Shield(name);
	}
}
