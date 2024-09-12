import {Handler} from '../../../../../../common/handler/Handler';
import {type GeneralPowerName} from '../../../../Power';
import {type Attribute} from '../../../../Sheet';
import {type SpellName} from '../../../../Spell';
import {type ArcanistPath, type ArcanistPathName} from '../ArcanistPath';
import {type ArcanistLineageDraconicDamageType, type ArcanistLineageType} from '../ArcanistPathSorcerer';

export type ArcanistPathHandlerRequest = {
	path: ArcanistPathName;
	mageSpell?: SpellName;
	sorcererLineage?: ArcanistLineageType;
	sorcererLineageDraconicDamageType?: ArcanistLineageDraconicDamageType;
	sorcererLineageFaerieExtraSpell?: SpellName;
	sorcererLineageRedExtraPower?: GeneralPowerName;
	sorcererLineageRedAttribute?: Attribute;
};

export abstract class ArcanistPathHandler extends Handler<
ArcanistPathHandlerRequest,
ArcanistPath
> {}
