import type {OffensiveWeapon} from '../Inventory/Equipment/Weapon/OffensiveWeapon/OffensiveWeapon';
import {type Attribute} from '../Sheet';
import {Attack} from './Attack';

export class WeaponAttack extends Attack {
	private selectedPurposeIndex = 0;

	constructor(readonly weapon: OffensiveWeapon) {
		super(weapon.damage, weapon.critical);
	}

	override getTestDefaultSkill() {
		const purpose = this.weapon.purposes[this.selectedPurposeIndex];
		return purpose.defaultSkill;
	}

	selectPurpose(index: number) {
		this.selectedPurposeIndex = index;
	}

	override getCustomTestAttributes(): Set<Attribute> {
		const purpose = this.weapon.purposes[this.selectedPurposeIndex];
		return purpose.customTestAttributes;
	}
}
