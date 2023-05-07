import {AbilityEffects, type AbilityEffectsInterface} from '../../../../../../Ability/AbilityEffects';
import {type AbilityLevel} from '../../../../../../Ability/AbilityLevel';
import {type TormentaPower} from '../../../../../../Power/GeneralPower/TormentaPower/TormentaPower';
import {type Attribute} from '../../../../../../Sheet';
import {ArcanistLineage} from '../ArcanistLineage';
import {ArcanistLineageType} from '../ArcanistLineageType';
import {ArcanistLineageRedCustomTormentaPowersAttributeEffect} from './ArcanistLineageRedCustomTormentaPowersAttributeEffect';
import {ArcanistLineageRedExtraTormentaPowerEffect} from './ArcanistLineageRedExtraTormentaPowerEffect';

export class ArcanistLineageRed extends ArcanistLineage {
	override type: ArcanistLineageType = ArcanistLineageType.red;
	override effects: Record<AbilityLevel, AbilityEffectsInterface>;

	constructor(power: TormentaPower, readonly attributeToLose: Attribute = 'charisma') {
		super();
		this.effects = {
			basic: new AbilityEffects({
				passive: {
					customTormentaPowersAttribute: new ArcanistLineageRedCustomTormentaPowersAttributeEffect(attributeToLose),
					extraTormentaPower: new ArcanistLineageRedExtraTormentaPowerEffect(power),
				},
			}),
			enhanced: new AbilityEffects(),
			higher: new AbilityEffects(),
		};
	}
}
