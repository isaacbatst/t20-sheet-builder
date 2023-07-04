import {ControlPlants} from '.';
import {ArcaneArmor} from './ArcaneArmor/ArcaneArmor';
import {FlamesExplosion} from './FlamesExplosion/FlamesExplosion';
import {IllusoryDisguise} from './IllusoryDisguise/IllusoryDisguise';
import {MentalDagger} from './MentalDagger/MentalDagger';
import type {SpellStatic} from './SpellStatic';

export class Spells {
	static getAll(): SpellStatic[] {
		return [
			ArcaneArmor,
			FlamesExplosion,
			IllusoryDisguise,
			MentalDagger,
			ControlPlants,
		];
	}
}
