import {ChainMail} from './ChainMail';
import {FullPlate} from './FullPlate';
import {type HeavyArmorName} from './HeavyArmorName';
import {type HeavyArmorStatic} from './HeavyArmorStatic';

export class HeavyArmors {
	static map: Record<HeavyArmorName, HeavyArmorStatic> = {
		fullPlate: FullPlate,
		chainMail: ChainMail,
	};

	static getAll(): HeavyArmorStatic[] {
		return Object.values(HeavyArmors.map);
	}

	static get(name: HeavyArmorName): HeavyArmorStatic {
		return HeavyArmors.map[name];
	}
}
