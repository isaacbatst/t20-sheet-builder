import {ArcanistPathWizard, ArcanistPathWizardFocusFactory, type ArcanisPathWizardFocusName, type ArcanistPath, ArcanistPathName} from '..';
import {ArcanistPathHandler, type ArcanistPathHandlerRequest} from './ArcanistPathHandler';

export class ArcanistPathHandlerWizard extends ArcanistPathHandler {
	public override handle(request: ArcanistPathHandlerRequest): ArcanistPath {
		if (!request.wizardFocus) {
			throw new Error('MISSING_WIZARD_FOCUS');
		}

		const focus = ArcanistPathWizardFocusFactory.make(request.wizardFocus);
		return new ArcanistPathWizard(focus);
	}

	protected override shouldHandle(request: ArcanistPathHandlerRequest): boolean {
		return request.path === ArcanistPathName.wizard;
	}
}
