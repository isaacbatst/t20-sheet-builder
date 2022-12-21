import type {ModifierCondition} from '../ModifierList';
import type {ActionInterface, ActionType, CharacterActionDescriptionGenerators} from '../SheetActions';
import type {SheetInterface} from '../SheetInterface';
import {StringHelper} from '../StringHelper';
import {Translator} from '../Translator';

export abstract class ActionDescriptionGenerator {
	static generate<T extends ActionType>(
		character: SheetInterface,
		action: ActionInterface<T>,
	): string {
		const generateDescription = ActionDescriptionGenerator.actionToDescriptionGenerate[action.type];
		return generateDescription(character, action);
	}

	private static readonly actionToDescriptionGenerate: CharacterActionDescriptionGenerators = {
		setInitialAttributes: (character, action) => `Definição inicial de atributos: ${StringHelper.getAttributesText(action.payload.attributes)}.`,
		addOtherModifierToDefense: (character, {payload: {modifier}}) => `${Translator.getTranslation(modifier.source)}: ${StringHelper.addNumberSign(modifier.getMaxPossibleValue())} Defesa aplicado ao modificador "outros".${ActionDescriptionGenerator.getModifierConditionText(modifier.condition)}`,
		addOtherModifierToSkill: (character, {payload: {skill, modifier}}) => `${Translator.getTranslation(modifier.source)}: ${StringHelper.addNumberSign(modifier.getMaxPossibleValue())} ${Translator.getSkillTranslation(skill)} aplicado ao modificador "outros".${ActionDescriptionGenerator.getModifierConditionText(modifier.condition)}`,
		applyRaceAbility: (character, action) => `Habilidade ${Translator.getAbilityTranslation(action.payload.ability.name)} aplicada.`,
		applyRaceModifiers(character, {payload: {modifiers}}) {
			const modifiersText = StringHelper.getAttributesText(modifiers);
			return `Modificadores de raça aplicados: ${modifiersText}.`;
		},
		addModifierToLifePoints: (character, {payload: {modifier}}) => `${Translator.getTranslation(modifier.source)}: ${StringHelper.addNumberSign(modifier.getMaxPossibleValue())} PV.${ActionDescriptionGenerator.getModifierConditionText(modifier.condition)}`,
		changeVision: (character, action) => `${Translator.getTranslation(action.payload.source)}: ${Translator.getVisionTranslation(action.payload.vision)} recebida.`,
		chooseRace: (character, action) => `Raça escolhida: ${Translator.getRaceTranslation(action.payload.race.name)}.`,
		trainSkill: (character, action) => `${Translator.getTranslation(action.payload.source)}: Perícia ${Translator.getSkillTranslation(action.payload.name)} treinada, bônus de treino ${StringHelper.addNumberSign(character.getSkillTrainingPoints(action.payload.name))}.`,
		pickPower: (character, action) => `${Translator.getTranslation(action.payload.source)}: poder ${Translator.getPowerTranslation(action.payload.power.name)} escolhido.`,
		changeDisplacement: (character, action) => `${Translator.getTranslation(action.payload.source)}: deslocamento alterado para ${action.payload.displacement}m.`,
	};

	private static getModifierConditionText(condition?: ModifierCondition) {
		return `${condition ? ` Ativação em: ${condition.description}.` : ''}`;
	}
}

