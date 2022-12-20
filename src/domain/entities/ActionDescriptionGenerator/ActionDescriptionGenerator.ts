import type {Action, CharacterAction, CharacterActionDescriptionGenerators} from '../CharacterAction';
import type {CharacterInterface} from '../CharacterInterface';
import {StringHelper} from '../StringHelper';
import {Translator} from '../Translator';

export abstract class ActionDescriptionGenerator {
	static generate<T extends CharacterAction>(
		character: CharacterInterface,
		action: Action<T>,
	): string {
		const generateDescription = ActionDescriptionGenerator.actionToDescriptionGenerate[action.type];
		return generateDescription(character, action);
	}

	private static readonly actionToDescriptionGenerate: CharacterActionDescriptionGenerators = {
		setInitialAttributes: (character, action) => `Definição inicial de atributos: ${StringHelper.getAttributesText(action.payload.attributes)}.`,
		addOtherModifierToDefense: (character, action) => `${Translator.getTranslation(action.payload.source)}: ${StringHelper.addNumberSign(action.payload.value)} Defesa aplicado ao modificador "outros". Atual ${character.getDefenseTotal()}.${action.payload.condition ? ` Ativação em: ${action.payload.condition.description}.` : ''}`,
		addOtherModifierToSkill: (character, {payload: {skill, value, source, condition}}) => `${Translator.getTranslation(source)}: ${StringHelper.addNumberSign(value)} ${Translator.getSkillTranslation(skill)} aplicado ao modificador "outros". Atual ${character.getSkillTotal(skill)}.${condition ? ` Ativação em: ${condition.description}.` : ''}`,
		applyRaceAbility: (_character, action) => `Habilidade ${Translator.getAbilityTranslation(action.payload.ability.name)} aplicada.`,
		applyRaceModifiers(_character, {payload: {modifiers, updatedAttributes}}) {
			const modifiersText = StringHelper.getAttributesText(modifiers);
			const updatedAttributesModifiersText = StringHelper.getAttributesText(updatedAttributes);

			return `Modificadores de raça aplicados, ${modifiersText}. Atual ${updatedAttributesModifiersText}.`;
		},
		changeVision: (character, action) => `${Translator.getTranslation(action.payload.source)}: ${Translator.getVisionTranslation(action.payload.vision)} recebida.`,
		chooseRace: (character, action) => `Raça escolhida: ${Translator.getRaceTranslation(action.payload.race.name)}.`,
		trainSkill: (character, action) => `${Translator.getTranslation(action.payload.source)}: Perícia ${Translator.getSkillTranslation(action.payload.name)} treinada, bônus de treino ${StringHelper.addNumberSign(character.getSkillTrainingPoints(action.payload.name))}. Atual 2`,
		pickPower: (character, action) => `${Translator.getTranslation(action.payload.source)}: poder ${Translator.getPowerTranslation(action.payload.power.name)} escolhido.`,
	};
}

