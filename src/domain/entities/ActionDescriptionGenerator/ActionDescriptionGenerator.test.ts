import {BuildingSheetFake} from '../BuildingSheetFake';
import {ConditionalModifier} from '../Modifier/ConditionalModifier';
import {Modifier} from '../Modifier/Modifier';
import {GeneralPowerName} from '../Power/GeneralPowerName';
import {GeneralPowerFake, RolePowerFake} from '../PowerFake';
import {Proficiency} from '../Proficiency';
import {RaceName} from '../Race/RaceName';
import {RaceAbilityName} from '../RaceAbility/RaceAbilityName';
import {RaceAbilityFake} from '../RaceAbilityFake';
import {RaceFake} from '../RaceFake';
import {RoleAbilityName} from '../Role/RoleAbilityName';
import {RoleName} from '../Role/RoleName';
import {RoleFake} from '../RoleFake';
import {Skill} from '../Skill/Skill';
import {SkillName} from '../Skill/SkillName';
import {Vision} from '../Vision';
import {ActionDescriptionGenerator} from './ActionDescriptionGenerator';

describe('ActionDescriptionGenerator', () => {
	it('should generate setInitialAttributes description', () => {
		const sheet = new BuildingSheetFake();
		sheet.attributes.charisma = 1;
		sheet.attributes.constitution = -1;

		const description = ActionDescriptionGenerator.generate(
			sheet,
			{type: 'setInitialAttributes', payload: {attributes: sheet.attributes}},
		);
		expect(description).toBe('Definição inicial de atributos: +0 Força, +0 Destreza, -1 Constituição, +0 Inteligência, +0 Sabedoria e +1 Carisma.');
	});

	it('should generate applyAbility description', () => {
		const sheet = new BuildingSheetFake();
		sheet.attributes.charisma = 1;
		sheet.attributes.constitution = -1;

		const description = ActionDescriptionGenerator.generate(
			sheet,
			{
				type: 'applyRaceAbility',
				payload: {ability: new RaceAbilityFake(), source: RaceName.human},
			},
		);
		expect(description).toBe('Humano: habilidade Versátil aplicada.');
	});

	it('should generate applyRaceModifiers description', () => {
		const sheet = new BuildingSheetFake();
		sheet.attributes.charisma = 1;
		sheet.attributes.constitution = -1;

		const description = ActionDescriptionGenerator.generate(
			sheet,
			{
				type: 'applyRaceModifiers',
				payload: {modifiers: {charisma: 2, dexterity: -1}, updatedAttributes: {charisma: 3, dexterity: -1}},
			},
		);

		expect(description).toBe('Modificadores de raça aplicados: +2 Carisma e -1 Destreza.');
	});

	it('should generate addOtherModifierToDefense description', () => {
		const sheet = new BuildingSheetFake();
		const description = ActionDescriptionGenerator.generate(
			sheet,
			{
				type: 'addOtherModifierToDefense',
				payload: {
					modifier: new Modifier(GeneralPowerName.dodge, 2),
				},
			},
		);

		expect(description).toBe('Esquiva: +2 Defesa aplicado ao modificador "outros".');
	});

	it('should generate addOtherModifierToDefense description with conditional', () => {
		const sheet = new BuildingSheetFake();
		const description = ActionDescriptionGenerator.generate(
			sheet,
			{
				type: 'addOtherModifierToDefense',
				payload: {
					modifier: new ConditionalModifier(GeneralPowerName.dodge, 2, {verify: jest.fn(), description: 'testes realizados no subterrâneo'}),
				},
			},
		);

		expect(description).toBe('Esquiva: +2 Defesa aplicado ao modificador "outros". Ativação em: testes realizados no subterrâneo.');
	});

	it('should generate addOtherModifierToDefense description', () => {
		const sheet = new BuildingSheetFake();
		const description = ActionDescriptionGenerator.generate(
			sheet,
			{
				type: 'addOtherModifierToDefense',
				payload: {
					modifier: new Modifier(GeneralPowerName.dodge, 2),
				},
			},
		);

		expect(description).toBe('Esquiva: +2 Defesa aplicado ao modificador "outros".');
	});

	it('should generate addOtherModifierToDefense description with conditional', () => {
		const sheet = new BuildingSheetFake();
		const description = ActionDescriptionGenerator.generate(
			sheet,
			{
				type: 'addOtherModifierToDefense',
				payload: {
					modifier: new ConditionalModifier(GeneralPowerName.dodge, 2, {verify: jest.fn(), description: 'testes realizados no subterrâneo'}),
				},
			},
		);

		expect(description).toBe('Esquiva: +2 Defesa aplicado ao modificador "outros". Ativação em: testes realizados no subterrâneo.');
	});

	it('should generate addOtherModifierToSkill description', () => {
		const sheet = new BuildingSheetFake();

		const description = ActionDescriptionGenerator.generate(
			sheet,
			{
				type: 'addOtherModifierToSkill',
				payload: {
					skill: SkillName.reflexes,
					modifier: new Modifier(GeneralPowerName.dodge, 2),
				},
			},
		);

		expect(description).toBe('Esquiva: +2 Reflexos aplicado ao modificador "outros".');
	});

	it('should generate addOtherModifierToSkill description with conditional', () => {
		const sheet = new BuildingSheetFake();

		const description = ActionDescriptionGenerator.generate(
			sheet,
			{
				type: 'addOtherModifierToSkill',
				payload: {
					skill: SkillName.perception,
					modifier: new ConditionalModifier(RaceAbilityName.rockKnowledge, 2, {verify: jest.fn(), description: 'testes realizados no subterrâneo'}),
				},
			},
		);

		expect(description).toBe('Conhecimento das Rochas: +2 Percepção aplicado ao modificador "outros". Ativação em: testes realizados no subterrâneo.');
	});

	it('should generate changeVision description', () => {
		const sheet = new BuildingSheetFake();

		const description = ActionDescriptionGenerator.generate(
			sheet,
			{
				type: 'changeVision',
				payload: {vision: Vision.dark, source: RaceAbilityName.rockKnowledge},
			},
		);

		expect(description).toBe('Conhecimento das Rochas: Visão no escuro recebida.');
	});

	it('should generate chooseRace description', () => {
		const sheet = new BuildingSheetFake();

		const description = ActionDescriptionGenerator.generate(
			sheet,
			{
				type: 'chooseRace',
				payload: {race: new RaceFake()},
			},
		);

		expect(description).toBe('Raça escolhida: Humano.');
	});

	it('should generate trainSkill description', () => {
		const sheet = new BuildingSheetFake();
		sheet.skills.fight = new Skill({attribute: 'strength', isTrained: true});

		const description = ActionDescriptionGenerator.generate(
			sheet,
			{
				type: 'trainSkill',
				payload: {name: SkillName.fight, source: RaceAbilityName.versatile},
			},
		);

		expect(description).toBe('Versátil: perícia Luta treinada, bônus de treino +2.');
	});

	it('should generate pickGeneralPower description', () => {
		const sheet = new BuildingSheetFake();
		sheet.skills.fight = new Skill({attribute: 'strength', isTrained: true});

		const description = ActionDescriptionGenerator.generate(
			sheet,
			{
				type: 'pickGeneralPower',
				payload: {power: new GeneralPowerFake(), source: RaceAbilityName.versatile},
			},
		);

		expect(description).toBe('Versátil: poder Esquiva escolhido.');
	});

	it('should generate pickRolePower description', () => {
		const sheet = new BuildingSheetFake();
		sheet.skills.fight = new Skill({attribute: 'strength', isTrained: true});

		const description = ActionDescriptionGenerator.generate(
			sheet,
			{
				type: 'pickRolePower',
				payload: {power: new RolePowerFake(), source: RoleAbilityName.warriorPower},
			},
		);

		expect(description).toBe('Poder de Guerreiro: Arqueiro.');
	});

	it('should generate changeDisplacement description', () => {
		const sheet = new BuildingSheetFake();

		const description = ActionDescriptionGenerator.generate(
			sheet,
			{
				type: 'changeDisplacement',
				payload: {
					displacement: 6,
					source: RaceAbilityName.slowAndAlways,
				},
			},
		);

		expect(description).toBe('Devagar e Sempre: deslocamento alterado para 6m.');
	});

	it('should generate addModifierToLifePoints description', () => {
		const sheet = new BuildingSheetFake();

		const description = ActionDescriptionGenerator.generate(
			sheet,
			{
				type: 'addModifierToLifePoints',
				payload: {modifier: new Modifier(RaceAbilityName.hardAsRock, 3)},
			},
		);

		expect(description).toBe('Duro como pedra: +3 PV.');
	});

	it('should generate chooseRole description', () => {
		const sheet = new BuildingSheetFake();
		const warrior = new RoleFake();

		const description = ActionDescriptionGenerator.generate(
			sheet,
			{
				type: 'chooseRole',
				payload: {role: warrior},
			},
		);

		expect(description).toBe('Classe escolhida: Guerreiro. 10 PV, 5 PM e 5 perícias iniciais.');
	});

	it('should generate addProficiency description', () => {
		const sheet = new BuildingSheetFake();

		const description = ActionDescriptionGenerator.generate(
			sheet,
			{
				type: 'addProficiency',
				payload: {proficiency: Proficiency.martial, source: RoleName.warrior},
			},
		);

		expect(description).toBe('Guerreiro: você é proficiente com armas marciais.');
	});
});
