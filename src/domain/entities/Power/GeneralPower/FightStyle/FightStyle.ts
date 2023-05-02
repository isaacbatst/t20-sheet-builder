import {AbilityEffects} from '../../../Ability/AbilityEffects';
import {GeneralPower} from '../GeneralPower';

export abstract class FightStyle extends GeneralPower {
	effects = new AbilityEffects({});
}
