import {AbilityEffects} from '../../Ability';
import {RaceAbility} from '../RaceAbility';
import {RaceAbilityName} from '../RaceAbilityName';
import {MagicBloodEffect} from './MagicBloodEffect';

export class MagicBlood extends RaceAbility {
	override effects = new AbilityEffects({
		passive: {
			default: new MagicBloodEffect(),
		},
	});

	constructor() {
		super(RaceAbilityName.magicBlood);
	}
}
