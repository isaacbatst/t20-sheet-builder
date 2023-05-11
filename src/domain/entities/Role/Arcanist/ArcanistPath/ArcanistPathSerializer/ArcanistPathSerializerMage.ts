import {type ArcanistPathMage} from '..';
import {type SerializedArcanistMage} from '../../SerializedArcanist';
import {ArcanistPathSerializer} from './ArcanistPathSerializer';

export class ArcanistPathSerializerMage extends ArcanistPathSerializer<
SerializedArcanistMage
> {
	constructor(
		protected path: ArcanistPathMage,
	) {
		super();
	}

	override serialize(): SerializedArcanistMage {
		return {
			extraSpell: this.path.getExtraSpell().name,
			name: this.path.pathName,
		};
	}
}
