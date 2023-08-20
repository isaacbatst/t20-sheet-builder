import {SheetBuilderError} from '../../../../../errors';
import {ArcanistPathWizardFocusFactory, ArcanistPathWizard} from '../ArcanisPathWizard';
import {type ArcanistPath, ArcanistPathName} from '../ArcanistPath';
import {ArcanistPathHandler, type ArcanistPathHandlerRequest} from './ArcanistPathHandler';

export class ArcanistPathHandlerWizard extends ArcanistPathHandler {
	public override handle(request: ArcanistPathHandlerRequest): ArcanistPath {
		if (!request.wizardFocus) {
			throw new SheetBuilderError('MISSING_WIZARD_FOCUS');
		}

		const focus = ArcanistPathWizardFocusFactory.make(request.wizardFocus);
		return new ArcanistPathWizard(focus);
	}

	protected override shouldHandle(request: ArcanistPathHandlerRequest): boolean {
		return request.path === ArcanistPathName.wizard;
	}
}
