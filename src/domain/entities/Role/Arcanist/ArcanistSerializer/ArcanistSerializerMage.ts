import {type ArcanistPathMage} from '../ArcanistPath';
import {ArcanistSerializer} from './ArcanistSerializer';
import {type SerializedArcanistMage} from '../SerializedArcanist';

export class ArcanistSerializerMage extends ArcanistSerializer<ArcanistPathMage, SerializedArcanistMage> {
	protected override serializePath(): SerializedArcanistMage {
		const path = this.arcanist.getPath();
		return {
			name: path.pathName,
			extraSpell: path.getAdditionalSpell().name,
		};
	}
}
