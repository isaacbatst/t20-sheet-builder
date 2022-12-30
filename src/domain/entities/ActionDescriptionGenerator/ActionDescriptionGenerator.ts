import type {Attribute, Attributes} from '../Sheet/Attributes';
import type {ActionDescriptionGenerators, ActionInterface, ActionType} from '../Sheet/SheetActions';
import type {SheetBaseInterface} from '../Sheet/SheetBaseInterface';
import {Skill} from '../Skill/Skill';
import {StringHelper} from '../StringHelper';
import {Translator} from '../Translator';

export abstract class ActionDescriptionGenerator {
	static generate<T extends ActionType>(
		sheet: SheetBaseInterface,
		action: ActionInterface<T>,
	): string {
		const generateDescription = ActionDescriptionGenerator.actionToDescriptionGenerate[action.type];
		return generateDescription(sheet, action);
	}

	private static readonly actionToDescriptionGenerate: ActionDescriptionGenerators = {
		setInitialAttributes: (sheet, action) => `Definição inicial de atributos: ${ActionDescriptionGenerator.getAttributeText(action.payload.attributes, 'strength')}, ${ActionDescriptionGenerator.getAttributeText(action.payload.attributes, 'dexterity')}, ${ActionDescriptionGenerator.getAttributeText(action.payload.attributes, 'constitution')}, ${ActionDescriptionGenerator.getAttributeText(action.payload.attributes, 'intelligence')}, ${ActionDescriptionGenerator.getAttributeText(action.payload.attributes, 'wisdom')} e ${ActionDescriptionGenerator.getAttributeText(action.payload.attributes, 'charisma')}.`,
		addContextualModifierToSkill: (sheet, {payload: {skill, modifier}}) => `${Translator.getTranslation(modifier.source)}: ${StringHelper.addNumberSign(modifier.value)} ${Translator.getSkillTranslation(skill)} aplicado ao modificador "outros". Ativação em: ${modifier.condition.description}.`,
		addFixedModifierToSkill: (sheet, {payload: {skill, modifier}}) => `${Translator.getTranslation(modifier.source)}: ${StringHelper.addNumberSign(modifier.value)} ${Translator.getSkillTranslation(skill)} aplicado ao modificador "outros".`,
		applyRaceAbility: (sheet, action) => `${Translator.getTranslation(action.payload.source)}: habilidade ${Translator.getAbilityTranslation(action.payload.ability.name)} aplicada.`,
		applyRaceModifiers(sheet, {payload: {modifiers}}) {
			const modifiersText = StringHelper.getAttributesText(modifiers);
			return `Modificadores de raça aplicados: ${modifiersText}.`;
		},
		addFixedModifierToLifePoints: (sheet, {payload: {modifier}}) => `${Translator.getTranslation(modifier.source)}: ${StringHelper.addNumberSign(modifier.value)} PV.`,
		changeVision: (sheet, action) => `${Translator.getTranslation(action.payload.source)}: ${Translator.getVisionTranslation(action.payload.vision)} recebida.`,
		chooseRace: (sheet, action) => `Raça escolhida: ${Translator.getRaceTranslation(action.payload.race.name)}.`,
		trainSkill: (sheet, action) => `${Translator.getTranslation(action.payload.source)}: perícia ${Translator.getSkillTranslation(action.payload.name)} treinada, bônus de treino ${StringHelper.addNumberSign(Skill.calculateTrainedPoints(sheet.getLevel()))}.`,
		pickGeneralPower: (sheet, action) => `${Translator.getTranslation(action.payload.source)}: poder ${Translator.getPowerTranslation(action.payload.power.name)} escolhido.`,
		pickRolePower: (sheet, action) => `${Translator.getTranslation(action.payload.source)}: ${Translator.getPowerTranslation(action.payload.power.name)}.`,
		changeDisplacement: (sheet, action) => `${Translator.getTranslation(action.payload.source)}: deslocamento alterado para ${action.payload.displacement}m.`,
		chooseRole: (sheet, {payload: {role}}) => `Classe escolhida: ${Translator.getRoleTranslation(role.name)}. ${role.initialLifePoints} PV, ${role.manaPerLevel} PM e ${role.getTotalInitialSkills()} perícias iniciais.`,
		addProficiency: (sheet, {payload: {proficiency, source}}) => `${Translator.getTranslation(source)}: você é proficiente com ${Translator.getProficiencyTranslation(proficiency)}.`,
		applyRoleAbility: (sheet, action) => `${Translator.getTranslation(action.payload.source)}: habilidade ${Translator.getRoleAbilityTranslation(action.payload.ability.name)} adicionada.`,
		learnCircle: (sheet, action) => `${Translator.getTranslation(action.payload.source)}: você pode lançar magias de ${Translator.getSpellCircleTranslation(action.payload.circle)} círculo.`,
		learnSpell: (sheet, action) => `${Translator.getTranslation(action.payload.source)}: você aprendeu a magia ${Translator.getSpellTranslation(action.payload.spell.name)}.`,
		addPerLevelModifierToLifePoints: (sheet, {payload: {modifier}}) => `${Translator.getTranslation(modifier.source)}: ${StringHelper.addNumberSign(modifier.value)} PV por nível${modifier.includeFirstLevel ? '' : ' após o nível 1'}.`,
		addFixedModifierToDefense: (sheet, {payload: {modifier}}) => `${Translator.getTranslation(modifier.source)}: ${StringHelper.addNumberSign(modifier.value)} Defesa adicionado.`,
		addPerLevelModifierToManaPoints: (sheet, {payload: {modifier}}) => `${Translator.getTranslation(modifier.source)}: ${StringHelper.addNumberSign(modifier.value)} PM ${modifier.attributeBonuses.length ? `(+ ${modifier.attributeBonuses.map(attribute => Translator.getAttributeTranslation(attribute)).join('/')}) ` : ''}por nível${modifier.includeFirstLevel ? '' : ' após o nível 1'}.`,
		trainIntelligenceSkills: (sheet, {payload}) => payload.skills.length ? `Perícias treinadas pela inteligência: ${payload.skills.map(skill => Translator.getSkillTranslation(skill)).join(', ')}.` : 'Nenhuma perícia treinada pela inteligência.',
		addEquipment: (action, {payload: {equipment, source}}) => `${Translator.getTranslation(source)}: ${Translator.getEquipmentTranslation(equipment.name)} adicionado ao inventário.`,
		pickOriginPower: (action, {payload: {power}}) => `${Translator.getTranslation(power.source)}: poder ${Translator.getPowerTranslation(power.name)} escolhido.`,
		chooseOrigin: (action, {payload: {origin}}) => `Origem escolhida: ${Translator.getOriginTranslation(origin.name)}.`,
	};

	private static getAttributeText(attributes: Attributes, attribute: Attribute) {
		return `${StringHelper.addNumberSign(attributes[attribute])} ${Translator.getAttributeTranslation(attribute)}`;
	}
}

