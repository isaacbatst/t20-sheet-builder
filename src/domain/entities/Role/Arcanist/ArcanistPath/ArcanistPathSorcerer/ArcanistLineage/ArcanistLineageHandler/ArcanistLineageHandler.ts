import {Handler} from '../../../../../../../../common/handler/Handler';
import {type GeneralPowerName} from '../../../../../../Power';
import {type Attribute} from '../../../../../../Sheet';
import {type SpellName} from '../../../../../../Spell';
import {type ArcanisPathWizardFocusName} from '../../../ArcanisPathWizard';
import {type ArcanistLineage} from '../ArcanistLineage';
import {type ArcanistLineageDraconicDamageType} from '../ArcanistLineageDraconic';
import {type ArcanistLineageType} from '../ArcanistLineageType';

export type ArcanistLineageHandlerRequest = {
	mageSpell?: SpellName;
	wizardFocus?: ArcanisPathWizardFocusName;
	sorcererLineage?: ArcanistLineageType;
	sorcererLineageDraconicDamageType?: ArcanistLineageDraconicDamageType;
	sorcererLineageFaerieExtraSpell?: SpellName;
	sorcererLineageRedExtraPower?: GeneralPowerName;
	sorcererLineageRedAttribute?: Attribute;
};

export abstract class ArcanistLineageHandler extends Handler<
ArcanistLineageHandlerRequest,
ArcanistLineage
> {}
