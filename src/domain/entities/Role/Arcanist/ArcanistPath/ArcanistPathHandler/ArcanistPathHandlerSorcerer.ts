import {SheetBuilderError} from '../../../../../errors';
import {type ArcanistPath, ArcanistPathName} from '../ArcanistPath';
import {ArcanistLineageFactoryHandlerDraconic, ArcanistLineageFactoryHandlerFaerie, ArcanistLineageFactoryHandlerRed, ArcanistPathSorcerer} from '../ArcanistPathSorcerer';
import {ArcanistPathHandler, type ArcanistPathHandlerRequest} from './ArcanistPathHandler';

export class ArcanistPathHandlerSorcerer extends ArcanistPathHandler {
	public override handle(request: ArcanistPathHandlerRequest): ArcanistPath {
		if (!request.sorcererLineage) {
			throw new SheetBuilderError('MISSING_SORCERER_LINEAGE');
		}

		const draconic = new ArcanistLineageFactoryHandlerDraconic();
		const faerie = new ArcanistLineageFactoryHandlerFaerie();
		const red = new ArcanistLineageFactoryHandlerRed();
		draconic
			.setNext(faerie)
			.setNext(red);

		const lineage = draconic.execute({
			mageSpell: request.mageSpell,
			wizardFocus: request.wizardFocus,
			sorcererLineageDraconicDamageType: request.sorcererLineageDraconicDamageType,
			sorcererLineageFaerieExtraSpell: request.sorcererLineageFaerieExtraSpell,
			sorcererLineage: request.sorcererLineage,
			sorcererLineageRedAttribute: request.sorcererLineageRedAttribute,
			sorcererLineageRedExtraPower: request.sorcererLineageRedExtraPower,
		});

		return new ArcanistPathSorcerer(lineage);
	}

	protected override shouldHandle(request: ArcanistPathHandlerRequest): boolean {
		return request.path === ArcanistPathName.sorcerer;
	}
}
