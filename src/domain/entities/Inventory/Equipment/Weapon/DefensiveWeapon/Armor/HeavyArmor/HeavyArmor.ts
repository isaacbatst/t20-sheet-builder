import {Proficiency} from '../../../../../../Sheet/Proficiency';
import {Armor} from '../Armor';
import type {ArmorStatic} from '../ArmorStatic';
import {ChainMail} from './ChainMail';
import {FullPlate} from './FullPlate';

export abstract class HeavyArmor extends Armor {
	static getAll(): ArmorStatic[] {
		return [
			FullPlate,
			ChainMail,
		];
	}

	constructor() {
		super(Proficiency.heavyArmor);
	}
}
