import {ArcanistFactory, type ArcanistFactoryParams} from './ArcanistFactory';
import {ArcanistLineageType, ArcanistPathSorcerer, type ArcanistLineageFactory, type ArcanistPath} from './ArcanistPath';
import {ArcanistLineageFactoryDraconic} from './ArcanistPath/ArcanistPathSorcerer/ArcanistLineage/ArcanistLineageFactoryDraconic';
import {ArcanistLineageFactoryFaerie} from './ArcanistPath/ArcanistPathSorcerer/ArcanistLineage/ArcanistLineageFactoryFaerie';
import {ArcanistLineageFactoryRed} from './ArcanistPath/ArcanistPathSorcerer/ArcanistLineage/ArcanistLineageFactoryRed';

export class ArcanistFactorySorcerer extends ArcanistFactory {
	private readonly lineageFactory: ArcanistLineageFactory;

	constructor(params: ArcanistFactoryParams) {
		super(params);

		if (!params.sorcererLineage) {
			throw new Error('MISSING_SORCERER_LINEAGE');
		}

		switch (params.sorcererLineage) {
			case ArcanistLineageType.draconic:
				this.lineageFactory = new ArcanistLineageFactoryDraconic(params);
				break;
			case ArcanistLineageType.faerie:
				this.lineageFactory = new ArcanistLineageFactoryFaerie(params);
				break;
			case ArcanistLineageType.red:
				this.lineageFactory = new ArcanistLineageFactoryRed(params);
				break;
			default:
				throw new Error('INVALID_SORCERER_LINEAGE');
		}
	}

	override makePath(): ArcanistPath {
		const lineage = this.lineageFactory.make();
		return new ArcanistPathSorcerer(lineage);
	}
}
