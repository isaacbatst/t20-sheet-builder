import {Proficiency} from '../../../../../Sheet/Proficiency';
import {DefensiveWeapon} from '../DefensiveWeapon';
import {type ShieldName} from './ShieldName';

export class Shield<
	N extends ShieldName = ShieldName,
> extends DefensiveWeapon<N> {
	constructor(
		name: N,
	) {
		super(name, Proficiency.shield);
	}
}
