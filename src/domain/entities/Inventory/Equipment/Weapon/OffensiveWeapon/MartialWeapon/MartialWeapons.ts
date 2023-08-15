import {BattleAxe} from './BattleAxe';
import {Cutlass} from './Cutlass';
import {Flail} from './Flail';
import {Halberd} from './Halberd';
import {HandAndaHalfSword} from './HandAndAHalfSword';
import {Hatchet} from './Hatchet';
import {LongBow} from './LongBow';
import {LongSword} from './LongSword';
import {type MartialWeaponStatic} from './MartialWeaponStatic';
import {Pickaxe} from './Pickaxe';
import {Scimitar} from './Scimitar';
import {Scythe} from './Scythe';
import {Trident} from './Trident';
import {WarHammer} from './WarHammer';

export class MartialWeapons {
	static getAll(): MartialWeaponStatic[] {
		return [
			BattleAxe,
			Cutlass,
			Flail,
			Halberd,
			HandAndaHalfSword,
			Hatchet,
			LongBow,
			LongSword,
			Pickaxe,
			Scimitar,
			Scythe,
			Trident,
			WarHammer,
		];
	}
}
