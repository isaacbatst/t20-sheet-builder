import {type EquipmentName} from '../../Inventory';
import {type GeneralPowerName, GeneralPowerFactory} from '../../Power';
import {type Attribute} from '../../Sheet';
import {type SkillName} from '../../Skill';
import {type SpellName, SpellFactory} from '../../Spell';
import {type Arcanist} from './Arcanist';
import {ArcanistBuilder} from './ArcanistBuider';
import {type ArcanistPathName, type ArcanistLineageType, type ArcanistLineageDraconicDamageType, type ArcanistPath, ArcanistPathMage, ArcanistPathWizardFocusFactory, type ArcanisPathWizardFocusName, ArcanistPathWizard, type ArcanistLineage, ArcanistLineageDraconic, ArcanistLineageFaerie, ArcanistLineageRed, ArcanistPathSorcerer} from './ArcanistPath';

export type ArcanistFactoryParams = {
	selectedSkillsByGroup: SkillName[][];
	initialSpells: SpellName[];
	pathName?: ArcanistPathName;
	mageSpell?: SpellName;
	wizardFocus?: EquipmentName;
	sorcererLineage?: ArcanistLineageType;
	sorcererLineageDraconicDamageType?: ArcanistLineageDraconicDamageType;
	sorcererLineageFaerieExtraSpell?: SpellName;
	sorcererLineageRedExtraPower?: GeneralPowerName;
	sorcererLineageRedAttribute?: Attribute;
};

export abstract class ArcanistFactory {
	protected pathName?: ArcanistPathName;
	protected mageSpell?: SpellName;
	protected wizardFocus?: EquipmentName;
	protected sorcererLineage?: ArcanistLineageType;
	protected sorcererLineageDraconicDamageType?: ArcanistLineageDraconicDamageType;
	protected sorcererLineageFaerieExtraSpell?: SpellName;
	protected sorcererLineageRedExtraPower?: GeneralPowerName;
	protected sorcererLineageRedAttribute?: Attribute;
	private readonly selectedSkillsByGroup: SkillName[][];
	private readonly initialSpells: SpellName[];

	constructor(params: ArcanistFactoryParams) {
		this.selectedSkillsByGroup = params.selectedSkillsByGroup;
		this.initialSpells = params.initialSpells;
		this.pathName = params.pathName;
		this.mageSpell = params.mageSpell;
		this.wizardFocus = params.wizardFocus;
		this.sorcererLineage = params.sorcererLineage;
		this.sorcererLineageDraconicDamageType = params.sorcererLineageDraconicDamageType;
		this.sorcererLineageFaerieExtraSpell = params.sorcererLineageFaerieExtraSpell;
		this.sorcererLineageRedExtraPower = params.sorcererLineageRedExtraPower;
		this.sorcererLineageRedAttribute = params.sorcererLineageRedAttribute;
	}

	make(): Arcanist {
		if (!this.pathName) {
			throw new Error('MISSING_ARCANIST_PATH');
		}

		const path = this.makePath();

		return ArcanistBuilder
			.chooseSkills(this.selectedSkillsByGroup.flat())
			.choosePath(path)
			.chooseSpells(this.initialSpells.map(spellName => SpellFactory.make(spellName)));
	}

	abstract makePath(): ArcanistPath;
}
