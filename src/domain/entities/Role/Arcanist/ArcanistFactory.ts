import {type ArcanisPathWizardFocusName, type ArcanistLineageDraconicDamageType, type ArcanistLineageType, type Attribute, type GeneralPowerName, type SerializedRole, type SkillName} from '../..';
import {SpellFactory, type SpellName} from '../../Spell';
import {type Arcanist} from './Arcanist';
import {ArcanistBuilder} from './ArcanistBuider';
import {ArcanistPathHandlerMage, ArcanistPathHandlerSorcerer, ArcanistPathHandlerWizard, type ArcanistPathName} from './ArcanistPath';
import {ArcanistPathSerializedHandlerMage, ArcanistPathSerializedHandlerSorcerer, ArcanistPathSerializedHandlerWizard} from './ArcanistPath/ArcanistPathSerializedHandler';
import {type SerializedArcanist, type SerializedArcanistPath} from './SerializedArcanist';

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
	static makeFromParams(params: ArcanistFactoryParams): Arcanist {
		const sorcerer = new ArcanistPathHandlerSorcerer();
		const mage = new ArcanistPathHandlerMage();
		const wizard = new ArcanistPathHandlerWizard();

		sorcerer
			.setNext(mage)
			.setNext(wizard);

		return ArcanistBuilder
			.chooseSkills(params.chosenSkills)
			.choosePath(sorcerer.execute(params))
			.chooseSpells(params.initialSpells.map(spellName => SpellFactory.make(spellName)));
	}

	static makeFromSerialized<
		P extends SerializedArcanistPath,
	>(serialized: SerializedRole<SerializedArcanist<P>>): Arcanist {
		const sorcerer = new ArcanistPathSerializedHandlerSorcerer();
		const mage = new ArcanistPathSerializedHandlerMage();
		const wizard = new ArcanistPathSerializedHandlerWizard();

		sorcerer
			.setNext(mage)
			.setNext(wizard);

		return ArcanistBuilder
			.chooseSkills(serialized.chosenSkills)
			.choosePath(sorcerer.execute(serialized.path))
			.chooseSpells(serialized.initialSpells.map(spellName => SpellFactory.make(spellName)));
	}
}
