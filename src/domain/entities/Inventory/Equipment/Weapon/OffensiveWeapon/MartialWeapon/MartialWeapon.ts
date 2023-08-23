import {Proficiency} from '../../../../../Sheet/Proficiency';
import {OffensiveWeapon} from '../OffensiveWeapon';
import {type MartialWeaponName} from './MartialWeaponName';

export abstract class MartialWeapon extends OffensiveWeapon<MartialWeaponName> {
	abstract override name: MartialWeaponName;

	constructor() {
		super(Proficiency.martial);
	}
}
