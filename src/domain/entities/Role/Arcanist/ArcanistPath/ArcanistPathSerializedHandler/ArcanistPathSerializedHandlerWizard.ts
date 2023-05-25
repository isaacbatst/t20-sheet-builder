import {ArcanistPathName, ArcanistPathWizard, ArcanistPathWizardFocusFactory, type ArcanistPath} from '..';
import {type SerializedArcanistWizard} from '../../SerializedArcanist';
import {ArcanistPathSerializedHandler} from './ArcanistPathSerializedHandler';

export class ArcanistPathSerializedHandlerWizard extends ArcanistPathSerializedHandler<SerializedArcanistWizard> {
	protected override handle(request: SerializedArcanistWizard): ArcanistPath {
		if (!request.focus) {
			throw new Error('MISSING_WIZARD_FOCUS');
		}

		const focus = ArcanistPathWizardFocusFactory.make(request.focus);
		return new ArcanistPathWizard(focus);
	}

	protected override shouldHandle(request: SerializedArcanistWizard): boolean {
		return request.name === ArcanistPathName.wizard;
	}
}
