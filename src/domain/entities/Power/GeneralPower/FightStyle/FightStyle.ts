import {AbilityEffects} from '../../../Ability/AbilityEffects';
import type {CharacterAppliedFightStyle} from '../../../Character/CharacterAppliedFightStyle';
import type {CharacterModifiers} from '../../../Character/CharacterModifiers';
import {GeneralPower} from '../GeneralPower';

export abstract class FightStyle extends GeneralPower {
	effects = new AbilityEffects({});

	abstract applyModifiers(modifiers: CharacterModifiers): CharacterAppliedFightStyle;
}
