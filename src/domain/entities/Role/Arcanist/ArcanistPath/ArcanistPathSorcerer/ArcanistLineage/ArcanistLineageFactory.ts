import {type GeneralPowerName} from '../../../../../Power';
import {type Attribute} from '../../../../../Sheet';
import {type SpellName} from '../../../../../Spell';
import {type ArcanistLineage} from './ArcanistLineage';
import {type ArcanistLineageDraconicDamageType} from './ArcanistLineageDraconic';

type ArcanistLineageParams = {
	sorcererLineageDraconicDamageType?: ArcanistLineageDraconicDamageType;
	sorcererLineageFaerieExtraSpell?: SpellName;
	sorcererLineageRedExtraPower?: GeneralPowerName;
	sorcererLineageRedAttribute?: Attribute;
};

export abstract class ArcanistLineageFactory {
	sorcererLineageDraconicDamageType?: ArcanistLineageDraconicDamageType;
	sorcererLineageFaerieExtraSpell?: SpellName;
	sorcererLineageRedExtraPower?: GeneralPowerName;
	sorcererLineageRedAttribute?: Attribute;

	constructor(
		params: ArcanistLineageParams,
	) {
		this.sorcererLineageDraconicDamageType = params.sorcererLineageDraconicDamageType;
		this.sorcererLineageFaerieExtraSpell = params.sorcererLineageFaerieExtraSpell;
		this.sorcererLineageRedExtraPower = params.sorcererLineageRedExtraPower;
		this.sorcererLineageRedAttribute = params.sorcererLineageRedAttribute;
	}

	abstract make(): ArcanistLineage;
}
