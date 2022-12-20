import {CharacterFake} from '../CharacterFake';
import {GeneralPowerNameEnum} from '../Power/GeneralPowerName';
import {RaceAbilityNameEnum} from '../RaceAbility/RaceAbilityName';
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
		expect(description).toBe('Definição inicial de atributos: Força 0, Destreza 0, Constituição -1, Inteligência 0, Sabedoria 0 e Carisma 1.');
	});

	it('should generate applyAbility description', () => {
		const character = new CharacterFake();
		character.attributes.charisma = 1;
		character.attributes.constitution = -1;

		const description = ActionDescriptionGenerator.generate(
			character,
			{
				type: 'applyAbility',
				payload: {name: RaceAbilityNameEnum.versatile},
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

		expect(description).toBe('Modificadores de raça aplicados, +2 Carisma e -1 Destreza. Atual +3 Carisma e -1 Destreza.');
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

		expect(description).toBe('Esquiva: +2 Defesa aplicado ao modificador "outros". Atual 12.');
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

		expect(description).toBe('Esquiva: +2 Defesa aplicado ao modificador "outros". Atual 12. Ativação em: testes realizados no subterrâneo.');
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

		expect(description).toBe('Esquiva: +2 Defesa aplicado ao modificador "outros". Atual 12.');
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

		expect(description).toBe('Esquiva: +2 Defesa aplicado ao modificador "outros". Atual 12. Ativação em: testes realizados no subterrâneo.');
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

		expect(description).toBe('Esquiva: +2 Reflexos aplicado ao modificador "outros". Atual 0.');
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

		expect(description).toBe('Conhecimento das Rochas: +2 Percepção aplicado ao modificador "outros". Atual 0. Ativação em: testes realizados no subterrâneo.');
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
				payload: {name: SkillNameEnum.fight},
			},
		);

		expect(description).toBe('Perícia treinada: Luta, bônus de treino +2. Atual 2');
	});
});
