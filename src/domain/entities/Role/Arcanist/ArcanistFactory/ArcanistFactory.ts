import {type EquipmentName} from '../../../Inventory';
import {type GeneralPowerName} from '../../../Power';
import {type Attribute} from '../../../Sheet';
import {type SkillName} from '../../../Skill';
import {SpellFactory, type SpellName} from '../../../Spell';
import {type Arcanist} from '../Arcanist';
import {ArcanistBuilder} from '../ArcanistBuider';
import {type ArcanistPathName, type ArcanistLineageDraconicDamageType, type ArcanistLineageType, type ArcanistPath, type ArcanisPathWizardFocusName, type ArcanistLineageFactory, ArcanistLineageFactoryDraconic, ArcanistLineageFactoryFaerie, ArcanistLineageFactoryRed} from '../ArcanistPath';
import {type ArcanistPathFactory} from '../ArcanistPath/ArcanistPathFactory/ArcanistPathFactory';
import {ArcanistPathFactoryMage} from '../ArcanistPath/ArcanistPathFactory/ArcanistPathFactoryMage';
import {ArcanistPathFactorySorcerer} from '../ArcanistPath/ArcanistPathFactory/ArcanistPathFactorySorcerer';
import {ArcanistPathFactoryWizard} from '../ArcanistPath/ArcanistPathFactory/ArcanistPathFactoryWizard';

export type ArcanistFactoryParams = {
	chosenSkills: SkillName[];
	initialSpells: SpellName[];
	pathName: ArcanistPathName;
	mageSpell?: SpellName;
	wizardFocus?: EquipmentName;
	sorcererLineage?: ArcanistLineageType;
	sorcererLineageDraconicDamageType?: ArcanistLineageDraconicDamageType;
	sorcererLineageFaerieExtraSpell?: SpellName;
	sorcererLineageRedExtraPower?: GeneralPowerName;
	sorcererLineageRedAttribute?: Attribute;
};

export abstract class ArcanistFactory {
	protected pathName: ArcanistPathName;
	private readonly chosenSkills: SkillName[];
	private readonly initialSpells: SpellName[];

	constructor(
		private readonly pathFactory: ArcanistPathFactory,
		params: ArcanistFactoryParams,
	) {
		this.chosenSkills = params.chosenSkills;
		this.initialSpells = params.initialSpells;
		this.pathName = params.pathName;
	}

	make(): Arcanist {
		const path = this.pathFactory.make();

		return ArcanistBuilder
			.chooseSkills(this.chosenSkills)
			.choosePath(path)
			.chooseSpells(this.initialSpells.map(spellName => SpellFactory.make(spellName)));
	}
}
