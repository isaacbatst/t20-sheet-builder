import {ArcanistPathMage, ArcanistPathName, type ArcanistPath} from '..';
import {SpellFactory} from '../../../../Spell';
import {type SerializedArcanistPath, type SerializedArcanistMage} from '../../SerializedArcanist';
import {ArcanistPathSerializedHandler} from './ArcanistPathSerializedHandler';

export class ArcanistPathSerializedHandlerMage extends ArcanistPathSerializedHandler<SerializedArcanistMage> {
	protected override handle(request: SerializedArcanistMage): ArcanistPath {
		const spell = SpellFactory.make(request.extraSpell);
		return new ArcanistPathMage(spell);
	}

	protected override shouldHandle(request: SerializedArcanistPath): boolean {
		return request.name === ArcanistPathName.mage;
	}
}
