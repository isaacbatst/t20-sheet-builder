import {ChainMail} from './ChainMail';
import {FullPlate} from './FullPlate';
import {type HeavyArmorName} from './HeavyArmorName';
import {type HeavyArmorStatic} from './HeavyArmorStatic';

export class HeavyArmorFactory {
	static map: Record<HeavyArmorName, HeavyArmorStatic> = {
		fullPlate: FullPlate,
		chainMail: ChainMail,
	};

	static getAll(): HeavyArmorStatic[] {
		return Object.values(this.map);
	}

	static getByName(name: HeavyArmorName): HeavyArmorStatic {
		return this.map[name];
	}
}
