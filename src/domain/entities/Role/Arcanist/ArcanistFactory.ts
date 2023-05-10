import {type EquipmentName} from '../../Inventory';
import {type GeneralPowerName, GeneralPowerFactory} from '../../Power';
import {type Attribute} from '../../Sheet';
import {type SkillName} from '../../Skill';
import {type SpellName, SpellFactory} from '../../Spell';
import {type Arcanist} from './Arcanist';
import {ArcanistBuilder} from './ArcanistBuider';
import {type ArcanistPathName, ArcanistLineageType, type ArcanistLineageDraconicDamageType, type ArcanistPath, ArcanistPathMage, ArcanistPathWizardFocusFactory, type ArcanisPathWizardFocusName, ArcanistPathWizard, type ArcanistLineage, ArcanistLineageDraconic, ArcanistLineageFaerie, ArcanistLineageRed, ArcanistPathSorcerer} from './ArcanistPath';

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

export class ArcanistFactory {
	static make(params: ArcanistFactoryParams): Arcanist {
		const {
			initialSpells,
			selectedSkillsByGroup,
			mageSpell,
			pathName,
			sorcererLineage,
			sorcererLineageDraconicDamageType,
			sorcererLineageFaerieExtraSpell,
			sorcererLineageRedAttribute,
			sorcererLineageRedExtraPower,
			wizardFocus,
		} = params;

		if (!pathName) {
			throw new Error('MISSING_ARCANIST_PATH');
		}

		let path: ArcanistPath | undefined;
		if (pathName === 'mage') {
			if (!mageSpell) {
				throw new Error('MISSING_MAGE_SPELL');
			}

			const spell = SpellFactory.make(mageSpell);
			path = new ArcanistPathMage(spell);
		}

		if (pathName === 'wizard') {
			if (!wizardFocus) {
				throw new Error('MISSING_WIZARD_FOCUS');
			}

			const focus = ArcanistPathWizardFocusFactory.make(wizardFocus as ArcanisPathWizardFocusName);
			path = new ArcanistPathWizard(focus);
		}

		if (pathName === 'sorcerer') {
			let lineage: ArcanistLineage | undefined;
			if (!sorcererLineage) {
				throw new Error('MISSING_SORCERER_LINEAGE');
			}

			if (sorcererLineage === ArcanistLineageType.draconic) {
				if (!sorcererLineageDraconicDamageType) {
					throw new Error('MISSING_DRACONIC_DAMAGE_TYPE');
				}

				lineage = new ArcanistLineageDraconic(sorcererLineageDraconicDamageType);
			}

			if (sorcererLineage === ArcanistLineageType.faerie) {
				if (!sorcererLineageFaerieExtraSpell) {
					throw new Error('MISSING_FAERIE_EXTRA_SPELL');
				}

				const spell = SpellFactory.make(sorcererLineageFaerieExtraSpell);
				lineage = new ArcanistLineageFaerie(spell);
			}

			if (sorcererLineage === ArcanistLineageType.red) {
				if (!sorcererLineageRedExtraPower) {
					throw new Error('MISSING_RED_EXTRA_POWER');
				}

				const power = GeneralPowerFactory.make({name: sorcererLineageRedExtraPower});
				lineage = new ArcanistLineageRed(power, sorcererLineageRedAttribute);
			}

			if (!lineage) {
				throw new Error('UNKNOWN_LINEAGE_ERROR');
			}

			path = new ArcanistPathSorcerer(lineage);
		}

		if (!path) {
			throw new Error('UNKNOWN_PATH_ERROR');
		}

		return ArcanistBuilder
			.chooseSkills(selectedSkillsByGroup.flat())
			.choosePath(path)
			.chooseSpells(initialSpells.map(spellName => SpellFactory.make(spellName)));
	}
}
