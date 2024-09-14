import {type CharacterModifiers} from '../../../../Character/CharacterModifiers';
import {FixedModifier} from '../../../../Modifier';
import {type Proficiency} from '../../../../Sheet/Proficiency';
import {Weapon} from '../Weapon';
import {type DefensiveWeaponData} from './DefensiveWeaponData';
import {type DefensiveWeaponName} from './DefensiveWeaponName';

export abstract class DefensiveWeapon<
	N extends DefensiveWeaponName = DefensiveWeaponName,
	D extends DefensiveWeaponData<N> = DefensiveWeaponData<N>,
> extends Weapon<N, D> {
	private modifierIndex: number | undefined;

	constructor(
		name: N,
		proficiency: Proficiency,
	) {
		super(name, proficiency, 'defensive');
	}

	override onEquip(modifiers: CharacterModifiers): void {
		const modifier = new FixedModifier(this.name, this.data.defenseBonus);
		this.modifierIndex = modifiers.defense.fixed.add(modifier);
	}

	override onUnequip(modifiers: CharacterModifiers): void {
		if (this.modifierIndex !== undefined) {
			modifiers.defense.fixed.remove(this.modifierIndex);
		}
	}
}
