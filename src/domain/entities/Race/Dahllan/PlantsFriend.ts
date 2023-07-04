import {AbilityEffects} from '../../Ability';
import {RaceAbility} from '../RaceAbility';
import {RaceAbilityName} from '../RaceAbilityName';
import {PlantsFriendEffect} from './PlantsFriendEffect';

export class PlantsFriend extends RaceAbility {
	override effects = new AbilityEffects({
		passive: {
			default: new PlantsFriendEffect(),
		},
	});

	constructor() {
		super(RaceAbilityName.plantsFriend);
	}
}
