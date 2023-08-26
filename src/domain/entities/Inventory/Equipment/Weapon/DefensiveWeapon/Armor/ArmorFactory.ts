import {type ArmorName} from './ArmorName';
import {Armors} from './Armors';

export class ArmorFactory {
	static make(name: ArmorName) {
		return new (Armors.get(name))();
	}
}
