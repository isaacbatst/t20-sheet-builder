import {GeneralPowerFactory} from '../../../../../Power';
import {type ArcanistLineage} from './ArcanistLineage';
import {ArcanistLineageFactory} from './ArcanistLineageFactory';
import {ArcanistLineageRed} from './ArcanistLineageRed';

export class ArcanistLineageFactoryRed extends ArcanistLineageFactory {
	override make(): ArcanistLineage {
		if (!this.sorcererLineageRedExtraPower) {
			throw new Error('MISSING_RED_EXTRA_POWER');
		}

		const power = GeneralPowerFactory.make({name: this.sorcererLineageRedExtraPower});
		return new ArcanistLineageRed(power, this.sorcererLineageRedAttribute);
	}
}
