import {AbilityEffects, type AbilityEffectsInterface} from '../../../Ability';
import {type SpellName} from '../../../Spell';
import {RaceAbility} from '../../RaceAbility';
import {RaceAbilityName} from '../../RaceAbilityName';
import {MysticTattooEffect} from './MysticTattooEffect';

export class MysticTattoo extends RaceAbility {
	override effects: AbilityEffectsInterface;

	constructor(readonly spell: SpellName) {
		super(RaceAbilityName.mysticTattoo);
		this.effects = new AbilityEffects({
			passive: {
				default: new MysticTattooEffect(spell),
			},
		});
	}
}
