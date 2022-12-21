import type {ActionInterface, ActionType, CharacterActionDescriptionGenerators} from '../CharacterAction';
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
		addOtherModifierToDefense: (character, action) => `${Translator.getTranslation(action.payload.source)}: ${StringHelper.addNumberSign(action.payload.value)} Defesa aplicado ao modificador "outros".${action.payload.condition ? ` Ativação em: ${action.payload.condition.description}.` : ''}`,
		addOtherModifierToSkill: (character, {payload: {skill, value, source, condition}}) => `${Translator.getTranslation(source)}: ${StringHelper.addNumberSign(value)} ${Translator.getSkillTranslation(skill)} aplicado ao modificador "outros".${condition ? ` Ativação em: ${condition.description}.` : ''}`,
		applyRaceAbility: (character, action) => `Habilidade ${Translator.getAbilityTranslation(action.payload.ability.name)} aplicada.`,
		applyRaceModifiers(character, {payload: {modifiers}}) {
			const modifiersText = StringHelper.getAttributesText(modifiers);
			return `Modificadores de raça aplicados: ${modifiersText}.`;
		},
		changeVision: (character, action) => `${Translator.getTranslation(action.payload.source)}: ${Translator.getVisionTranslation(action.payload.vision)} recebida.`,
		chooseRace: (character, action) => `Raça escolhida: ${Translator.getRaceTranslation(action.payload.race.name)}.`,
		trainSkill: (character, action) => `${Translator.getTranslation(action.payload.source)}: Perícia ${Translator.getSkillTranslation(action.payload.name)} treinada, bônus de treino ${StringHelper.addNumberSign(character.getSkillTrainingPoints(action.payload.name))}.`,
		pickPower: (character, action) => `${Translator.getTranslation(action.payload.source)}: poder ${Translator.getPowerTranslation(action.payload.power.name)} escolhido.`,
	};
}

