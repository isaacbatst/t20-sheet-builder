import type {OffensiveWeapon} from '../Inventory/Equipment/Weapon/OffensiveWeapon/OffensiveWeapon';
import {type Attributes, type Attribute} from '../Sheet';
import {Attack} from './Attack';

export class WeaponAttack extends Attack {
	private selectedPurposeIndex = 0;

	constructor(readonly weapon: OffensiveWeapon) {
		super(weapon.damage, weapon.critical, weapon.name);
	}

	override getTestDefaultSkill() {
		const purpose = this.weapon.purposes[this.selectedPurposeIndex];
		return purpose.defaultSkill;
	}

	selectPurpose(index: number) {
		this.selectedPurposeIndex = index;
	}

	override getDamageAttribute(): keyof Attributes | undefined {
		const purpose = this.weapon.purposes[this.selectedPurposeIndex];
		return purpose.damageAttribute;
	}

	override getCustomTestAttributes(): Set<Attribute> {
		const purpose = this.weapon.purposes[this.selectedPurposeIndex];
		return purpose.customTestAttributes;
	}
}
