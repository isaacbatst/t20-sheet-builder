import {CharacterFake} from '../CharacterFake';
import {GeneralPowerNameEnum} from '../Power/GeneralPowerName';
import {PowerFake} from '../PowerFake';
import {RaceAbilityNameEnum} from '../RaceAbility/RaceAbilityName';
import {RaceAbilityFake} from '../RaceAbilityFake';
import {RaceFake} from '../RaceFake';
import {Skill} from '../Skill/Skill';
import {SkillNameEnum} from '../Skill/SkillName';
import {Vision} from '../Vision';
import {ActionDescriptionGenerator} from './ActionDescriptionGenerator';

describe('ActionDescriptionGenerator', () => {
	it('should generate setInitialAttributes description', () => {
		const character = new CharacterFake();
		character.attributes.charisma = 1;
		character.attributes.constitution = -1;

		const description = ActionDescriptionGenerator.generate(
			character,
			{type: 'setInitialAttributes', payload: {attributes: character.attributes}},
		);
		expect(description).toBe('Definição inicial de atributos: +0 Força, +0 Destreza, -1 Constituição, +0 Inteligência, +0 Sabedoria e +1 Carisma.');
	});

	it('should generate applyAbility description', () => {
		const character = new CharacterFake();
		character.attributes.charisma = 1;
		character.attributes.constitution = -1;

		const description = ActionDescriptionGenerator.generate(
			character,
			{
				type: 'applyRaceAbility',
				payload: {ability: new RaceAbilityFake()},
			},
		);
		expect(description).toBe('Habilidade Versátil aplicada.');
	});

	it('should generate applyRaceModifiers description', () => {
		const character = new CharacterFake();
		character.attributes.charisma = 1;
		character.attributes.constitution = -1;

		const description = ActionDescriptionGenerator.generate(
			character,
			{
				type: 'applyRaceModifiers',
				payload: {modifiers: {charisma: 2, dexterity: -1}, updatedAttributes: {charisma: 3, dexterity: -1}},
			},
		);

		expect(description).toBe('Modificadores de raça aplicados: +2 Carisma e -1 Destreza.');
	});

	it('should generate addOtherModifierToDefense description', () => {
		const character = new CharacterFake();
		character.defenseTotal = 12;

		const description = ActionDescriptionGenerator.generate(
			character,
			{
				type: 'addOtherModifierToDefense',
				payload: {source: GeneralPowerNameEnum.dodge, value: 2},
			},
		);

		expect(description).toBe('Esquiva: +2 Defesa aplicado ao modificador "outros".');
	});

	it('should generate addOtherModifierToDefense description with conditional', () => {
		const character = new CharacterFake();
		character.defenseTotal = 12;

		const description = ActionDescriptionGenerator.generate(
			character,
			{
				type: 'addOtherModifierToDefense',
				payload: {source: GeneralPowerNameEnum.dodge, value: 2, condition: {verify: jest.fn(), description: 'testes realizados no subterrâneo'}},
			},
		);

		expect(description).toBe('Esquiva: +2 Defesa aplicado ao modificador "outros". Ativação em: testes realizados no subterrâneo.');
	});

	it('should generate addOtherModifierToDefense description', () => {
		const character = new CharacterFake();
		character.defenseTotal = 12;

		const description = ActionDescriptionGenerator.generate(
			character,
			{
				type: 'addOtherModifierToDefense',
				payload: {source: GeneralPowerNameEnum.dodge, value: 2},
			},
		);

		expect(description).toBe('Esquiva: +2 Defesa aplicado ao modificador "outros".');
	});

	it('should generate addOtherModifierToDefense description with conditional', () => {
		const character = new CharacterFake();
		character.defenseTotal = 12;

		const description = ActionDescriptionGenerator.generate(
			character,
			{
				type: 'addOtherModifierToDefense',
				payload: {source: GeneralPowerNameEnum.dodge, value: 2, condition: {verify: jest.fn(), description: 'testes realizados no subterrâneo'}},
			},
		);

		expect(description).toBe('Esquiva: +2 Defesa aplicado ao modificador "outros". Ativação em: testes realizados no subterrâneo.');
	});

	it('should generate addOtherModifierToSkill description', () => {
		const character = new CharacterFake();

		const description = ActionDescriptionGenerator.generate(
			character,
			{
				type: 'addOtherModifierToSkill',
				payload: {source: GeneralPowerNameEnum.dodge, value: 2, skill: SkillNameEnum.reflexes},
			},
		);

		expect(description).toBe('Esquiva: +2 Reflexos aplicado ao modificador "outros".');
	});

	it('should generate addOtherModifierToSkill description with conditional', () => {
		const character = new CharacterFake();

		const description = ActionDescriptionGenerator.generate(
			character,
			{
				type: 'addOtherModifierToSkill',
				payload: {source: RaceAbilityNameEnum.rockKnowledge, value: 2, skill: SkillNameEnum.perception, condition: {verify: jest.fn(), description: 'testes realizados no subterrâneo'}},
			},
		);

		expect(description).toBe('Conhecimento das Rochas: +2 Percepção aplicado ao modificador "outros". Ativação em: testes realizados no subterrâneo.');
	});

	it('should generate changeVision description', () => {
		const character = new CharacterFake();

		const description = ActionDescriptionGenerator.generate(
			character,
			{
				type: 'changeVision',
				payload: {vision: Vision.dark, source: RaceAbilityNameEnum.rockKnowledge},
			},
		);

		expect(description).toBe('Conhecimento das Rochas: Visão no escuro recebida.');
	});

	it('should generate chooseRace description', () => {
		const character = new CharacterFake();

		const description = ActionDescriptionGenerator.generate(
			character,
			{
				type: 'chooseRace',
				payload: {race: new RaceFake()},
			},
		);

		expect(description).toBe('Raça escolhida: Humano.');
	});

	it('should generate trainSkill description', () => {
		const character = new CharacterFake();
		character.skills.fight = new Skill({attribute: 'strength', isTrained: true});

		const description = ActionDescriptionGenerator.generate(
			character,
			{
				type: 'trainSkill',
				payload: {name: SkillNameEnum.fight, source: RaceAbilityNameEnum.versatile},
			},
		);

		expect(description).toBe('Versátil: Perícia Luta treinada, bônus de treino +2.');
	});

	it('should generate pickPower description', () => {
		const character = new CharacterFake();
		character.skills.fight = new Skill({attribute: 'strength', isTrained: true});

		const description = ActionDescriptionGenerator.generate(
			character,
			{
				type: 'pickPower',
				payload: {power: new PowerFake(), source: RaceAbilityNameEnum.versatile},
			},
		);

		expect(description).toBe('Versátil: poder Esquiva escolhido.');
	});
});
