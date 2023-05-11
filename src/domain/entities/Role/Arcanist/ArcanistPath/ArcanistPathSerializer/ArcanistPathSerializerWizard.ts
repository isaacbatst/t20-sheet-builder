import {type SerializedArcanistWizard} from '../../SerializedArcanist';
import {type ArcanistPathWizard} from '../ArcanisPathWizard';
import {ArcanistPathSerializer} from './ArcanistPathSerializer';

export class ArcanistPathSerializerWizard extends ArcanistPathSerializer<
SerializedArcanistWizard
> {
	constructor(private readonly path: ArcanistPathWizard) {
		super();
	}

	override serialize(): SerializedArcanistWizard {
		return {
			focus: this.path.getFocus().equipment.name,
			name: this.path.pathName,
		};
	}
}
