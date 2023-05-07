import {AbilityEffects} from '../../../../Ability/AbilityEffects';
import {type CharacterAppliedFightStyle} from '../../../../Character/CharacterAppliedFightStyle';
import {type CharacterModifiers} from '../../../../Character/CharacterModifiers';
import {GeneralPower} from '../../GeneralPower';
import {GeneralPowerGroup} from '../../GeneralPowerGroup';

export abstract class FightStyle extends GeneralPower {
	effects = new AbilityEffects({});
	override group: GeneralPowerGroup = GeneralPowerGroup.combat;

	abstract applyModifiers(modifiers: CharacterModifiers): CharacterAppliedFightStyle;
}
