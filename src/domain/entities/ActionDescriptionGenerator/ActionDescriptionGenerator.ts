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
		setInitialAttributes: (character, action) => `Definição inicial de atributos: ${StringHelper.getAttributesText(action.payload.attributes)}`,
		addOtherModifierToDefense: (character, action) => `${Translator.getTranslation(action.payload.source)}: ${StringHelper.addNumberSign(action.payload.value)} Defesa aplicado ao modificador "outros". Atual ${character.getDefenseTotal()}.${action.payload.condition ? ` Ativação em: ${action.payload.condition.description}.` : ''}`,
		addOtherModifierToSkill: (character, {payload: {skill, value, source, condition}}) => `${Translator.getTranslation(source)}: ${StringHelper.addNumberSign(value)} ${Translator.getTranslatedSkill(skill)} aplicado ao modificador "outros". Atual ${character.getSkillTotal(skill)}.${condition ? ` Ativação em: ${condition.description}.` : ''}`,
		applyAbility: (_character, action) => `Habilidade ${Translator.getTranslatedAbility(action.payload.name)} aplicada.`,
		applyRaceModifiers(_character, {payload: {modifiers, updatedAttributes}}) {
			const modifiersText = StringHelper.getAttributesText(modifiers);
			const updatedAttributesModifiersText = StringHelper.getAttributesText(updatedAttributes);

			return `Modificadores de raça aplicados, ${modifiersText}. Atual ${updatedAttributesModifiersText}.`;
		},
		changeVision: (character, action) => `${Translator.getTranslation(action.payload.source)}: ${Translator.getTranslatedVision(action.payload.vision)} recebida.`,
		chooseRace: (character, action) => `Raça escolhida: ${Translator.getTranslatedRace(action.payload.race.name)}.`,
		trainSkill: (character, action) => `Perícia treinada: ${Translator.getTranslatedSkill(action.payload.name)}, bônus de treino ${StringHelper.addNumberSign(character.getSkillTrainingPoints(action.payload.name))}. Atual 2`,
	};
}

