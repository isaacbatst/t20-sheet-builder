import {BastardSword} from './BastardSword';
import {ChainofThorns} from './ChainofThorns';
import {DwarfAxe} from './DwarfAxe';
import {type ExoticWeaponStatic} from './ExoticWeaponStatic';
import {Katana} from './Katana';
import {TauricAxe} from './TauricAxe';
import {Whip} from './Whip';

export class MartialWeapons {
	static getAll(): ExoticWeaponStatic[] {
		return [
			Whip,
			BastardSword,
			Katana,
			DwarfAxe,
			ChainofThorns,
			TauricAxe,
		];
	}
}
