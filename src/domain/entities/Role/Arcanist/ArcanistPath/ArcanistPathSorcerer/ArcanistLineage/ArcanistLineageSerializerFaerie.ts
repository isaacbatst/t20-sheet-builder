import {type SerializedArcanistLineageFaerie} from '../../../SerializedArcanist';
import {type ArcanistLineageFaerie} from './ArcanistLineageFaerie';
import {ArcanistLineageSerializer} from './ArcanistLineageSerializer';

export class ArcanistLineageSerializerFaerie extends ArcanistLineageSerializer<
ArcanistLineageFaerie,
SerializedArcanistLineageFaerie
> {
	override serialize(): SerializedArcanistLineageFaerie {
		return {
			type: this.lineage.type,
			extraSpell: this.lineage.getExtraSpell().name,
		};
	}
}
