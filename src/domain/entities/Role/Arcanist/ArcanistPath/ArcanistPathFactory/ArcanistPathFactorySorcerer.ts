import {ArcanistPathSorcerer, type ArcanistLineageFactory, type ArcanistPath} from '..';
import {ArcanistPathFactory} from './ArcanistPathFactory';

export class ArcanistPathFactorySorcerer extends ArcanistPathFactory {
	constructor(
		private readonly lineageFactory: ArcanistLineageFactory,
	) {
		super();
	}

	make(): ArcanistPath {
		const lineage = this.lineageFactory.make();
		return new ArcanistPathSorcerer(lineage);
	}
}
