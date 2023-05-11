import {type SerializedArcanistLineageDraconic} from '../../../SerializedArcanist';
import {type ArcanistLineageDraconic} from './ArcanistLineageDraconic';
import {ArcanistLineageSerializer} from './ArcanistLineageSerializer';

export class ArcanistLineageSerializerDraconic extends ArcanistLineageSerializer<
ArcanistLineageDraconic,
SerializedArcanistLineageDraconic
> {
	override serialize(): SerializedArcanistLineageDraconic {
		return {
			damageType: this.lineage.getDamageType(),
			type: this.lineage.type,
		};
	}
}
