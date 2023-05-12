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
		return ArcanistBuilder
			.chooseSkills(params.chosenSkills)
			.choosePath(ArcanistFactory.pathHandlers.execute(params))
			.chooseSpells(params.initialSpells.map(spellName => SpellFactory.make(spellName)));
	}

	static makeFromSerialized<
		P extends SerializedArcanistPath,
	>(serialized: SerializedRole<SerializedArcanist<P>>): Arcanist {
		return ArcanistBuilder
			.chooseSkills(serialized.chosenSkills)
			.choosePath(ArcanistFactory.serializedHandlers.execute(serialized.path))
			.chooseSpells(serialized.spells.map(spellName => SpellFactory.make(spellName)));
	}

	private static readonly pathHandlers = new ArcanistPathHandlerSorcerer()
		.setNext(new ArcanistPathHandlerMage())
		.setNext(new ArcanistPathHandlerWizard());

	private static readonly serializedHandlers = new ArcanistPathSerializedHandlerSorcerer()
		.setNext(new ArcanistPathSerializedHandlerMage())
		.setNext(new ArcanistPathSerializedHandlerWizard());
}
