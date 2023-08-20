import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {WeaponPurposeMelee} from '../../WeaponPurpose';
import {ExoticWeapon} from './ExoticWeapon';
import {type ExoticWeaponName} from './ExoticWeaponName';

export class ChainofThorns extends ExoticWeapon {
	static damage = new DiceRoll(2, 4);
	static critical = new Critical(19);
	static equipmentName: ExoticWeaponName = EquipmentName.chainofThorns;
	static purposes = [
		new WeaponPurposeMelee(),
	];

	override damage: DiceRoll = ChainofThorns.damage;
	override critical: Critical = ChainofThorns.critical;
	override name = ChainofThorns.equipmentName;
	override purposes = ChainofThorns.purposes;
}
