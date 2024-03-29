import {AbilityEffects, type AbilityEffectsInterface} from '../../../../../../Ability/AbilityEffects';
import {type AbilityLevel} from '../../../../../../Ability/AbilityLevel';
import {type TormentaPower} from '../../../../../../Power/GeneralPower/TormentaPower/TormentaPower';
import {type Attribute} from '../../../../../../Sheet';
import {type SerializedArcanistLineage} from '../../../../SerializedArcanist';
import {ArcanistLineage} from '../ArcanistLineage';
import {ArcanistLineageType} from '../ArcanistLineageType';
import {ArcanistLineageRedCustomTormentaPowersAttributeEffect} from './ArcanistLineageRedCustomTormentaPowersAttributeEffect';
import {ArcanistLineageRedExtraTormentaPowerEffect} from './ArcanistLineageRedExtraTormentaPowerEffect';

export class ArcanistLineageRed extends ArcanistLineage {
	readonly type = ArcanistLineageType.red;
	override effects: Record<AbilityLevel, AbilityEffectsInterface> & {
		basic: {
			passive: {
				customTormentaPowersAttribute: ArcanistLineageRedCustomTormentaPowersAttributeEffect;
				extraTormentaPower: ArcanistLineageRedExtraTormentaPowerEffect;
			};
		};
	};

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

	getExtraPower(): TormentaPower {
		return this.effects.basic.passive.extraTormentaPower.power;
	}

	getCustomTormentaPowersAttribute(): Attribute {
		return this.effects.basic.passive.customTormentaPowersAttribute.attribute;
	}

	override serialize(): SerializedArcanistLineage {
		return {
			type: this.type,
			extraPower: this.getExtraPower().name,
			customTormentaAttribute: this.getCustomTormentaPowersAttribute(),
		};
	}
}
