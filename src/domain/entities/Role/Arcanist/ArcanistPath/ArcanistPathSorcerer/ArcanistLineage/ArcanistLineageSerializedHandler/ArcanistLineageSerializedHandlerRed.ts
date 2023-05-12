import {GeneralPowerFactory} from '../../../../../../Power';
import {type SerializedArcanistLineageRed} from '../../../../SerializedArcanist';
import {ArcanistLineageRed} from '../ArcanistLineageRed';
import {ArcanistLineageType} from '../ArcanistLineageType';
import {ArcanistLineageSerializedHandler} from './ArcanistLineageSerializedHandler';

export class ArcanistLineageSerializedHandlerRed extends ArcanistLineageSerializedHandler<SerializedArcanistLineageRed> {
	public override handle(request: SerializedArcanistLineageRed): ArcanistLineageRed {
		if (!request.customTormentaAttribute) {
			throw new Error('MISSING_SORCERER_LINEAGE_RED_ATTRIBUTE');
		}

		if (!request.extraPower) {
			throw new Error('MISSING_SORCERER_LINEAGE_RED_EXTRA_POWER');
		}

		const power = GeneralPowerFactory.make({name: request.extraPower});
		return new ArcanistLineageRed(power, request.customTormentaAttribute);
	}

	protected override shouldHandle(request: SerializedArcanistLineageRed): boolean {
		return request.type === ArcanistLineageType.red;
	}
}
