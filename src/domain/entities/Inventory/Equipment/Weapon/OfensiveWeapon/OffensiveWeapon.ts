import type {DiceDamage} from '../../../../Dice/DiceDamage';
import type {WeaponType} from '../Weapon';
import {Weapon} from '../Weapon';
import type {Critical} from './Critical';

export abstract class OffensiveWeapon extends Weapon {
	abstract readonly damage: DiceDamage;
	abstract readonly critical: Critical;
	get type(): WeaponType {
		return 'offensive';
	}
}
