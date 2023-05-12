import {ArcanistPathMage, ArcanistPathName, type ArcanistPath} from '..';
import {SpellFactory} from '../../../../Spell';
import {type SerializedArcanistPath, type SerializedArcanistMage} from '../../SerializedArcanist';
import {ArcanistPathSerializedHandler} from './ArcanistPathSerializedHandler';

export class ArcanistPathSerializedHandlerMage extends ArcanistPathSerializedHandler<SerializedArcanistMage> {
	public override handle(request: SerializedArcanistMage): ArcanistPath {
		if (!request.extraSpell) {
			throw new Error('MISSING_MAGE_SPELL');
		}

		const spell = SpellFactory.make(request.extraSpell);
		return new ArcanistPathMage(spell);
	}

	protected override shouldHandle(request: SerializedArcanistPath): boolean {
		return request.name === ArcanistPathName.mage;
	}
}
