import {Equipment} from './Equipment';
import {type EquipmentName} from './EquipmentName';
import {WeaponFactory} from './Weapon/WeaponFactory';
import {isWeaponName} from './Weapon/WeaponName';

export class EquipmentFactory {
	static make<N extends EquipmentName>(name: N): Equipment<N> {
		if (isWeaponName(name)) {
			return WeaponFactory.make(name);
		}

		return new Equipment(name);
	}
}
