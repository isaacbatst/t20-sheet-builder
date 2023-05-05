import type {ArmorStatic} from '../ArmorStatic';
import {ChainMail} from './ChainMail';
import {FullPlate} from './FullPlate';

export class HeavyArmors {
	static getAll(): ArmorStatic[] {
		return [
			FullPlate,
			ChainMail,
		];
	}
}
