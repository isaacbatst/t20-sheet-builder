import {ArcanistPathName, ArcanistPathWizard, type ArcanistPath} from '..';
import {type SerializedArcanistWizard} from '../../SerializedArcanist';
import {ArcanistPathSerializedHandler} from './ArcanistPathSerializedHandler';

export class ArcanistPathSerializedHandlerWizard extends ArcanistPathSerializedHandler<SerializedArcanistWizard> {
	protected override handle(request: SerializedArcanistWizard): ArcanistPath {
		return new ArcanistPathWizard();
	}

	protected override shouldHandle(request: SerializedArcanistWizard): boolean {
		return request.name === ArcanistPathName.wizard;
	}
}
