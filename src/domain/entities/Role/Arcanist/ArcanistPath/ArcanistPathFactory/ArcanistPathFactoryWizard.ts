import {ArcanistPathWizard, ArcanistPathWizardFocusFactory, type ArcanisPathWizardFocusName, type ArcanistPath} from '..';
import {ArcanistPathFactory} from './ArcanistPathFactory';

export class ArcanistPathFactoryWizard extends ArcanistPathFactory {
	constructor(private readonly wizardFocus: ArcanisPathWizardFocusName) {
		super();
	}

	override make(): ArcanistPath {
		const focus = ArcanistPathWizardFocusFactory.make(this.wizardFocus);
		return new ArcanistPathWizard(focus);
	}
}
