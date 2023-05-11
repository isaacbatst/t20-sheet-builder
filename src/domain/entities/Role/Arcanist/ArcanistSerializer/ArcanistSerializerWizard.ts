import {type ArcanistPathWizard} from '../ArcanistPath';
import {type SerializedArcanistWizard} from '../SerializedArcanist';
import {ArcanistSerializer} from './ArcanistSerializer';

export class ArcanistSerializerWizard extends ArcanistSerializer<
ArcanistPathWizard,
SerializedArcanistWizard
> {
	protected override serializePath(): SerializedArcanistWizard {
		const path = this.arcanist.getPath();
		return {
			focus: path.getFocus().equipment.name,
			name: path.pathName,
		};
	}
}
