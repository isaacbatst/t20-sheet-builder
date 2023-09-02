import {ControlPlants} from './ControlPlants/ControlPlants';
import {ArcaneArmor} from './ArcaneArmor/ArcaneArmor';
import {FlamesExplosion} from './FlamesExplosion/FlamesExplosion';
import {IllusoryDisguise} from './IllusoryDisguise/IllusoryDisguise';
import {MentalDagger} from './MentalDagger/MentalDagger';
import type {SpellStatic} from './SpellStatic';
import {CureWounds} from './Divine/CureWounds';
import {DivineProtection} from './Divine/DivineProtection';
import {FaithShield} from './Divine/FaithShield';
import {MagicWeapon} from './Divine/MagicWeapon';

export class Spells {
	static getAll(): SpellStatic[] {
		return [
			...Spells.getAllArcane(),
			...Spells.getAllDivine(),
		];
	}

	static getAllArcane(): SpellStatic[] {
		return [
			ArcaneArmor,
			FlamesExplosion,
			IllusoryDisguise,
			MentalDagger,
			ControlPlants,
		];
	}

	static getAllDivine(): SpellStatic[] {
		return [
			CureWounds,
			DivineProtection,
			FaithShield,
			MagicWeapon,
		];
	}
}
