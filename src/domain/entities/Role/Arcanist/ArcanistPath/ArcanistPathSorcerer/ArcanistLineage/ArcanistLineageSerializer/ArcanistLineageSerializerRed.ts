import {type SerializedArcanistLineageRed} from '../../../../SerializedArcanist';
import {type ArcanistLineageRed} from '../ArcanistLineageRed';
import {ArcanistLineageSerializer} from './ArcanistLineageSerializer';

export class ArcanistLineageSerializerRed extends ArcanistLineageSerializer<
ArcanistLineageRed,
SerializedArcanistLineageRed
> {
	override serialize(): SerializedArcanistLineageRed {
		return {
			type: this.lineage.type,
			customTormentaAttribute: this.lineage.getCustomTormentaPowersAttribute(),
			extraPower: this.lineage.getExtraPower().name,
		};
	}
}
