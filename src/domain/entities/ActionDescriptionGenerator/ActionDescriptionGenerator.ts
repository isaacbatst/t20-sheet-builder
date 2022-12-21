import type {ModifierCondition} from '../ModifierList';
import type {ActionInterface, ActionType, ActionDescriptionGenerators} from '../SheetActions';
import type {SheetInterface} from '../SheetInterface';
import {StringHelper} from '../StringHelper';
import {Translator} from '../Translator';

export abstract class ActionDescriptionGenerator {
	static generate<T extends ActionType>(
		sheet: SheetInterface,
		action: ActionInterface<T>,
	): string {
		const generateDescription = ActionDescriptionGenerator.actionToDescriptionGenerate[action.type];
		return generateDescription(sheet, action);
	}

	private static readonly actionToDescriptionGenerate: ActionDescriptionGenerators = {
		setInitialAttributes: (sheet, action) => `Definição inicial de atributos: ${StringHelper.getAttributesText(action.payload.attributes)}.`,
		addOtherModifierToDefense: (sheet, {payload: {modifier}}) => `${Translator.getTranslation(modifier.source)}: ${StringHelper.addNumberSign(modifier.getMaxPossibleValue())} Defesa aplicado ao modificador "outros".${ActionDescriptionGenerator.getModifierConditionText(modifier.condition)}`,
		addOtherModifierToSkill: (sheet, {payload: {skill, modifier}}) => `${Translator.getTranslation(modifier.source)}: ${StringHelper.addNumberSign(modifier.getMaxPossibleValue())} ${Translator.getSkillTranslation(skill)} aplicado ao modificador "outros".${ActionDescriptionGenerator.getModifierConditionText(modifier.condition)}`,
		applyRaceAbility: (sheet, action) => `Habilidade ${Translator.getAbilityTranslation(action.payload.ability.name)} aplicada.`,
		applyRaceModifiers(sheet, {payload: {modifiers}}) {
			const modifiersText = StringHelper.getAttributesText(modifiers);
			return `Modificadores de raça aplicados: ${modifiersText}.`;
		},
		addModifierToLifePoints: (sheet, {payload: {modifier}}) => `${Translator.getTranslation(modifier.source)}: ${StringHelper.addNumberSign(modifier.getMaxPossibleValue())} PV.${ActionDescriptionGenerator.getModifierConditionText(modifier.condition)}`,
		changeVision: (sheet, action) => `${Translator.getTranslation(action.payload.source)}: ${Translator.getVisionTranslation(action.payload.vision)} recebida.`,
		chooseRace: (sheet, action) => `Raça escolhida: ${Translator.getRaceTranslation(action.payload.race.name)}.`,
		trainSkill: (sheet, action) => `${Translator.getTranslation(action.payload.source)}: Perícia ${Translator.getSkillTranslation(action.payload.name)} treinada, bônus de treino ${StringHelper.addNumberSign(sheet.getSkillTrainingPoints(action.payload.name))}.`,
		pickPower: (sheet, action) => `${Translator.getTranslation(action.payload.source)}: poder ${Translator.getPowerTranslation(action.payload.power.name)} escolhido.`,
		changeDisplacement: (sheet, action) => `${Translator.getTranslation(action.payload.source)}: deslocamento alterado para ${action.payload.displacement}m.`,
	};

	private static getModifierConditionText(condition?: ModifierCondition) {
		return `${condition ? ` Ativação em: ${condition.description}.` : ''}`;
	}
}

