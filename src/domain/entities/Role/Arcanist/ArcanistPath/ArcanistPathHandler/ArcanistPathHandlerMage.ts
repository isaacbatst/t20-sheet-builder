import {ArcanistPathMage, ArcanistPathName, type ArcanistPath} from '..';
import {SpellFactory} from '../../../../Spell';
import {ArcanistPathHandler, type ArcanistPathHandlerRequest} from './ArcanistPathHandler';

export class ArcanistPathHandlerMage extends ArcanistPathHandler {
	public override handle(request: ArcanistPathHandlerRequest): ArcanistPath {
		if (!request.mageSpell) {
			throw new Error('MISSING_MAGE_SPELL');
		}

		const spell = SpellFactory.make(request.mageSpell);
		return new ArcanistPathMage(spell);
	}

	protected override shouldHandle(request: ArcanistPathHandlerRequest): boolean {
		return request.path === ArcanistPathName.mage;
	}
}
