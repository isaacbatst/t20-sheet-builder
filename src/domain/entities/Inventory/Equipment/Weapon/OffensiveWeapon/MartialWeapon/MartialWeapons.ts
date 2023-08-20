import {BattleAxe} from './BattleAxe';
import {Cutlass} from './Cutlass';
import {Flail} from './Flail';
import {Foil} from './Foil';
import {Halberd} from './Halberd';
import {HandAndaHalfSword} from './HandAndAHalfSword';
import {Hatchet} from './Hatchet';
import {HeavyCrossbow} from './HeavyCrossbow';
import {LongBow} from './LongBow';
import {LongSword} from './LongSword';
import {type MartialWeaponName} from './MartialWeaponName';
import {type MartialWeaponStatic} from './MartialWeaponStatic';
import {MountedSpear} from './MountedSpear';
import {Pickaxe} from './Pickaxe';
import {Scimitar} from './Scimitar';
import {Scythe} from './Scythe';
import {Trident} from './Trident';
import {WarAxe} from './WarAxe';
import {WarHammer} from './WarHammer';

export class MartialWeapons {
	static map: Record<MartialWeaponName, MartialWeaponStatic> = {
		warAxe: WarAxe,
		battleAxe: BattleAxe,
		cutlass: Cutlass,
		flail: Flail,
		foil: Foil,
		halberd: Halberd,
		longSword: LongSword,
		handAndaHalfSword: HandAndaHalfSword,
		hatchet: Hatchet,
		heavyCrossbow: HeavyCrossbow,
		longBow: LongBow,
		mountedSpear: MountedSpear,
		pickaxe: Pickaxe,
		scimitar: Scimitar,
		scythe: Scythe,
		trident: Trident,
		warHammer: WarHammer,
	};

	static getAll(): MartialWeaponStatic[] {
		return Object.values(this.map);
	}

	static getByName(name: MartialWeaponName): MartialWeaponStatic {
		return this.map[name];
	}
}
