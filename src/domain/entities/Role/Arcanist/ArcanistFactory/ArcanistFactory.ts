import {type GeneralPowerName} from '../../../Power';
import {type Attribute} from '../../../Sheet';
import {type SkillName} from '../../../Skill';
import {SpellFactory, type SpellName} from '../../../Spell';
import {type Arcanist} from '../Arcanist';
import {ArcanistBuilder} from '../ArcanistBuider';
import {ArcanistPathHandlerSorcerer, type ArcanisPathWizardFocusName, type ArcanistLineageDraconicDamageType, type ArcanistLineageType, type ArcanistPathHandler, type ArcanistPathName, ArcanistPathHandlerMage, ArcanistPathHandlerWizard} from '../ArcanistPath';

export type ArcanistFactoryParams = {
	chosenSkills: SkillName[];
	initialSpells: SpellName[];
	path: ArcanistPathName;
	mageSpell?: SpellName;
	wizardFocus?: ArcanisPathWizardFocusName;
	sorcererLineage?: ArcanistLineageType;
	sorcererLineageDraconicDamageType?: ArcanistLineageDraconicDamageType;
	sorcererLineageFaerieExtraSpell?: SpellName;
	sorcererLineageRedExtraPower?: GeneralPowerName;
	sorcererLineageRedAttribute?: Attribute;
};

export class ArcanistFactory {
	constructor(
		private readonly params: ArcanistFactoryParams,
	) {}

	make(): Arcanist {
		const sorcerer = new ArcanistPathHandlerSorcerer();
		const mage = new ArcanistPathHandlerMage();
		const wizard = new ArcanistPathHandlerWizard();
		sorcerer
			.setNext(mage)
			.setNext(wizard);

		return ArcanistBuilder
			.chooseSkills(this.params.chosenSkills)
			.choosePath(sorcerer.execute(this.params))
			.chooseSpells(this.params.initialSpells.map(spellName => SpellFactory.make(spellName)));
	}
}
