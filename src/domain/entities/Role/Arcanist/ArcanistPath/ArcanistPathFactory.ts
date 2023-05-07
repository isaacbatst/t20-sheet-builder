import {type Spell} from '../../../Spell';
import {ArcanistPathWizard, type ArcanistPathWizardFocus} from './ArcanisPathWizard';
import {ArcanistPathName, type ArcanistPath} from './ArcanistPath';
import {ArcanistPathMage} from './ArcanistPathMage';
import {ArcanistPathSorcerer} from './ArcanistPathSorcerer';
import {type ArcanistLineage} from './ArcanistPathSorcerer/ArcanistLineage';

type ArcanistPathFactoryParams = {
	path: ArcanistPathName.mage;
	spell: Spell;
} | {
	path: ArcanistPathName.sorcerer;
	lineage: ArcanistLineage;
} | {
	path: ArcanistPathName.wizard;
	focus: ArcanistPathWizardFocus;
};

export class ArcanistPathFactory {
	static make(params: ArcanistPathFactoryParams): ArcanistPath {
		if (params.path === ArcanistPathName.mage) {
			return new ArcanistPathMage(params.spell);
		}

		if (params.path === ArcanistPathName.sorcerer) {
			return new ArcanistPathSorcerer(params.lineage);
		}

		if (params.path === ArcanistPathName.wizard) {
			return new ArcanistPathWizard(params.focus);
		}

		throw new Error('INVALID_ARCANIST_PATH');
	}
}
