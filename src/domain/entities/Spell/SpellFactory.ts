import {ArcaneArmor} from './ArcaneArmor/ArcaneArmor';
import {ControlPlants} from './ControlPlants/ControlPlants';
import {FlamesExplosion} from './FlamesExplosion/FlamesExplosion';
import {IllusoryDisguise} from './IllusoryDisguise/IllusoryDisguise';
import {MentalDagger} from './MentalDagger/MentalDagger';
import {type Spell} from './Spell';
import {type SpellName} from './SpellName';
import {type SpellStatic} from './SpellStatic';

export class SpellFactory {
	static make(name: SpellName): Spell {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		const SpellClass = SpellFactory.map[name];
		return new SpellClass();
	}

	private static readonly map: Record<SpellName, SpellStatic> = {
		arcaneArmor: ArcaneArmor,
		flamesExplosion: FlamesExplosion,
		illusoryDisguise: IllusoryDisguise,
		mentalDagger: MentalDagger,
		controlPlants: ControlPlants,
	};
}
