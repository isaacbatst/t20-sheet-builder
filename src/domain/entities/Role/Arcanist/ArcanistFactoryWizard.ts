import {ArcanistFactory} from './ArcanistFactory';
import {type ArcanisPathWizardFocusName, ArcanistPathWizard, ArcanistPathWizardFocusFactory, type ArcanistPath} from './ArcanistPath';

export class ArcanistFactoryWizard extends ArcanistFactory {
	override makePath(): ArcanistPath {
		if (!this.wizardFocus) {
			throw new Error('MISSING_WIZARD_FOCUS');
		}

		const focus = ArcanistPathWizardFocusFactory.make(this.wizardFocus as ArcanisPathWizardFocusName);
		return new ArcanistPathWizard(focus);
	}
}
