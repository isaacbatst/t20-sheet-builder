import {SheetBuilderError} from '../../../../../../../errors';
import {GeneralPowerFactory} from '../../../../../../Power';
import {ArcanistLineageRed} from '../ArcanistLineageRed';
import {ArcanistLineageType} from '../ArcanistLineageType';
import {ArcanistLineageHandler, type ArcanistLineageHandlerRequest} from './ArcanistLineageHandler';

export class ArcanistLineageFactoryHandlerRed extends ArcanistLineageHandler {
	protected override handle(request: ArcanistLineageHandlerRequest): ArcanistLineageRed {
		if (!request.sorcererLineageRedAttribute) {
			throw new SheetBuilderError('MISSING_SORCERER_LINEAGE_RED_ATTRIBUTE');
		}

		if (!request.sorcererLineageRedExtraPower) {
			throw new SheetBuilderError('MISSING_SORCERER_LINEAGE_RED_EXTRA_POWER');
		}

		const power = GeneralPowerFactory.make({name: request.sorcererLineageRedExtraPower});
		return new ArcanistLineageRed(power, request.sorcererLineageRedAttribute);
	}

	protected override shouldHandle(request: ArcanistLineageHandlerRequest): boolean {
		return request.sorcererLineage === ArcanistLineageType.red;
	}
}
