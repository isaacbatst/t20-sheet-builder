import {BastardSword} from './BastardSword';
import {ChainofThorns} from './ChainofThorns';
import {DwarfAxe} from './DwarfAxe';
import {type ExoticWeaponName} from './ExoticWeaponName';
import {type ExoticWeaponStatic} from './ExoticWeaponStatic';
import {Katana} from './Katana';
import {TauricAxe} from './TauricAxe';
import {Whip} from './Whip';

export class MartialWeapons {
	static map: Record<ExoticWeaponName, ExoticWeaponStatic> = {
		whip: Whip,
		bastardSword: BastardSword,
		katana: Katana,
		dwarfAxe: DwarfAxe,
		chainofThorns: ChainofThorns,
		tauricAxe: TauricAxe,
	};

	static getAll(): ExoticWeaponStatic[] {
		return Object.values(this.map);
	}

	static getByName(name: ExoticWeaponName): ExoticWeaponStatic {
		return this.map[name];
	}
}
