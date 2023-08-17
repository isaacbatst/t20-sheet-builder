import {SheetBuilderError} from '../../../../../errors';
import {SpellFactory} from '../../../../Spell';
import {ArcanistPathName, type ArcanistPath} from '../ArcanistPath';
import {ArcanistPathMage} from '../ArcanistPathMage';
import {ArcanistPathHandler, type ArcanistPathHandlerRequest} from './ArcanistPathHandler';

export class ArcanistPathHandlerMage extends ArcanistPathHandler {
	public override handle(request: ArcanistPathHandlerRequest): ArcanistPath {
		if (!request.mageSpell) {
			throw new SheetBuilderError('MISSING_MAGE_SPELL');
		}

		const spell = SpellFactory.make(request.mageSpell);
		return new ArcanistPathMage(spell);
	}

	protected override shouldHandle(request: ArcanistPathHandlerRequest): boolean {
		return request.path === ArcanistPathName.mage;
	}
}
