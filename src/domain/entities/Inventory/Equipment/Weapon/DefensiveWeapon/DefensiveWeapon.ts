import {type CharacterModifiers} from '../../../../Character/CharacterModifiers';
import {FixedModifier} from '../../../../Modifier';
import {type EquipmentName} from '../../EquipmentName';
import type {WeaponType} from '../Weapon';
import {Weapon} from '../Weapon';

export abstract class DefensiveWeapon<T extends EquipmentName = EquipmentName> extends Weapon<T> {
	abstract defenseBonus: number;
	abstract armorPenalty: number;
	abstract slots: number;

	get type(): WeaponType {
		return 'defensive';
	}

	private modifierIndex: number | undefined;

	override onEquip(modifiers: CharacterModifiers): void {
		const modifier = new FixedModifier(this.name, this.defenseBonus);
		this.modifierIndex = modifiers.defense.fixed.add(modifier);
	}

	override onUnequip(modifiers: CharacterModifiers): void {
		if (this.modifierIndex !== undefined) {
			modifiers.defense.fixed.remove(this.modifierIndex);
		}
	}
}
