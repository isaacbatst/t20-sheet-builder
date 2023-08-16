
import {AbilityEffects} from '../../Ability';
import {RaceAbility} from '../RaceAbility';
import {RaceAbilityName} from '../RaceAbilityName';
import {FearOfHeightsEffect} from './FearOfHeightsEffect';

export class FearOfHeights extends RaceAbility {
	override effects = new AbilityEffects({
		passive: {
			default: new FearOfHeightsEffect(),
		},
	});

	constructor() {
		super(RaceAbilityName.fearOfHeights);
	}
}
