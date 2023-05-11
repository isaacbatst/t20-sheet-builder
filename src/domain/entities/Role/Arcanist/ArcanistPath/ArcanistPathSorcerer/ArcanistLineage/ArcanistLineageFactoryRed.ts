import {GeneralPowerFactory, type GeneralPowerName} from '../../../../../Power';
import {type Attribute} from '../../../../../Sheet';
import {type ArcanistLineage} from './ArcanistLineage';
import {ArcanistLineageFactory} from './ArcanistLineageFactory';
import {ArcanistLineageRed} from './ArcanistLineageRed';

export class ArcanistLineageFactoryRed extends ArcanistLineageFactory {
	private readonly sorcererLineageRedExtraPower: GeneralPowerName;
	private readonly sorcererLineageRedAttribute: Attribute;

	constructor(params: {
		sorcererLineageRedExtraPower: GeneralPowerName;
		sorcererLineageRedAttribute: Attribute;
	}) {
		super();
		this.sorcererLineageRedExtraPower = params.sorcererLineageRedExtraPower;
		this.sorcererLineageRedAttribute = params.sorcererLineageRedAttribute;
	}

	override make(): ArcanistLineage {
		if (!this.sorcererLineageRedExtraPower) {
			throw new Error('MISSING_RED_EXTRA_POWER');
		}

		const power = GeneralPowerFactory.make({name: this.sorcererLineageRedExtraPower});
		return new ArcanistLineageRed(power, this.sorcererLineageRedAttribute);
	}
}
