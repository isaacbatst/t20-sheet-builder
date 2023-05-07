import {type TormentaPower} from '../../../../Power';
import {type Attribute} from '../../../../Sheet';
import {type Spell} from '../../../../Spell';
import {type ArcanistLineage} from './ArcanistLineage';
import {ArcanistLineageDraconic, type ArcanistLineageDraconicDamageType} from './ArcanistLineageDraconic';
import {ArcanistLineageFaerie} from './ArcanistLineageFaerie';
import {ArcanistLineageRed} from './ArcanistLineageRed';
import {ArcanistLineageType} from './ArcanistLineageType';

type ArcanistLineageParams = {
	lineage: ArcanistLineageType.draconic;
	damageType: ArcanistLineageDraconicDamageType;
} | {
	lineage: ArcanistLineageType.faerie;
	extraSpell: Spell;
} | {
	lineage: ArcanistLineageType.red;
	extraPower: TormentaPower;
	attributeToLose?: Attribute;
};

export class ArcanistLineageFactory {
	static make(params: ArcanistLineageParams): ArcanistLineage {
		if (params.lineage === ArcanistLineageType.draconic) {
			return new ArcanistLineageDraconic(params.damageType);
		}

		if (params.lineage === ArcanistLineageType.faerie) {
			return new ArcanistLineageFaerie(params.extraSpell);
		}

		if (params.lineage === ArcanistLineageType.red) {
			return new ArcanistLineageRed(params.extraPower, params.attributeToLose);
		}

		throw new Error('INVALID_ARCANIST_LINEAGE');
	}
}
