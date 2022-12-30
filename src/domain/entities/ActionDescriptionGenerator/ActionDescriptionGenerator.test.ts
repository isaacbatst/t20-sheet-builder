import {AddPerLevelModifierToLifePoints} from '../Action/AddPerLevelModifierToLifePoints';
import {AddPerLevelModifierToManaPoints} from '../Action/AddPerLevelModifierToManaPoints';
import {AddProficiency} from '../Action/AddProficiency';
import {ApplyRoleAbility} from '../Action/ApplyRoleAbility';
import {ChooseRole} from '../Action/ChooseRole';
import {TrainIntelligenceSkills} from '../Action/TrainIntelligenceSkills';
import {ContextualModifier} from '../Modifier/ContextualModifier/ContextualModifier';
import {FixedModifier} from '../Modifier/FixedModifier/FixedModifier';
import {PerLevelModifier} from '../Modifier/PerLevelModifier/PerLevelModifier';
import {GeneralPowerName} from '../Power/GeneralPowerName';
import {GeneralPowerFake, RolePowerFake} from '../Power/PowerFake';
import {Proficiency} from '../Sheet/Proficiency';
import {RaceName} from '../Race/RaceName';
import {RaceAbilityName} from '../Race/RaceAbilityName';
import {RaceAbilityFake} from '../Race/RaceAbilityFake';
import {RaceFake} from '../Race/RaceFake';
import {RoleAbilityFake} from '../Role/RoleAbilityFake';
import {RoleAbilityName} from '../Role/RoleAbilityName';
import {RoleName} from '../Role/RoleName';
import {RoleFake} from '../Role/RoleFake';
import {BuildingSheetFake} from '../Sheet/BuildingSheetFake';
import {Skill} from '../Skill/Skill';
import {SkillName} from '../Skill/SkillName';
import {Vision} from '../Sheet/Vision';
import {ActionDescriptionGenerator} from './ActionDescriptionGenerator';
import {AddEquipment} from '../Action/AddEquipment';
import {Equipment} from '../Equipment/Equipment';
import {EquipmentName} from '../Equipment/EquipmentName';
import {OriginName} from '../Origin/OriginName';
import {PickOriginPower} from '../Action/PickOriginPower';
import {ChurchMember} from '../Power/OriginPower/ChurchMember';
import {ChooseOrigin} from '../Action/ChooseOrigin';
import {Acolyte} from '../Origin/Acolyte';
import {OriginFake} from '../Origin/OriginFake';

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

	it('should generate addFixedModifierToDefense description', () => {
		const sheet = new BuildingSheetFake();
		const description = ActionDescriptionGenerator.generate(
			sheet,
			{
				type: 'addFixedModifierToDefense',
				payload: {
					modifier: new FixedModifier(GeneralPowerName.dodge, 2),
				},
			},
		);

		expect(description).toBe('Esquiva: +2 Defesa adicionado.');
	});

	it('should generate addContextualModifierToSkill description with conditional', () => {
		const sheet = new BuildingSheetFake();
		const description = ActionDescriptionGenerator.generate(
			sheet,
			{
				type: 'addContextualModifierToSkill',
				payload: {
					modifier: new ContextualModifier(GeneralPowerName.dodge, 2, {verify: jest.fn(), description: 'testes realizados no subterrâneo'}),
					skill: SkillName.perception,
				},
			},
		);

		expect(description).toBe('Esquiva: +2 Percepção aplicado ao modificador "outros". Ativação em: testes realizados no subterrâneo.');
	});

	it('should generate addFixedModifierToSkill description', () => {
		const sheet = new BuildingSheetFake();

		const description = ActionDescriptionGenerator.generate(
			sheet,
			{
				type: 'addFixedModifierToSkill',
				payload: {
					skill: SkillName.reflexes,
					modifier: new FixedModifier(GeneralPowerName.dodge, 2),
				},
			},
		);

		expect(description).toBe('Esquiva: +2 Reflexos aplicado ao modificador "outros".');
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

	it('should generate addFixedModifierToLifePoints description', () => {
		const sheet = new BuildingSheetFake();

		const description = ActionDescriptionGenerator.generate(
			sheet,
			{
				type: 'addFixedModifierToLifePoints',
				payload: {modifier: new FixedModifier(RaceAbilityName.hardAsRock, 3)},
			},
		);

		expect(description).toBe('Duro como pedra: +3 PV.');
	});

	it('should generate chooseRole description', () => {
		const sheet = new BuildingSheetFake();
		const warrior = new RoleFake();

		const description = ActionDescriptionGenerator.generate(
			sheet,
			new ChooseRole({role: warrior}),
		);

		expect(description).toBe('Classe escolhida: Guerreiro. 10 PV, 5 PM e 5 perícias iniciais.');
	});

	it('should generate addProficiency description', () => {
		const sheet = new BuildingSheetFake();

		const description = ActionDescriptionGenerator.generate(
			sheet,
			new AddProficiency({proficiency: Proficiency.martial, source: RoleName.warrior}),
		);

		expect(description).toBe('Guerreiro: você é proficiente com armas marciais.');
	});

	it('should generate applyRoleAbility description', () => {
		const sheet = new BuildingSheetFake();

		const description = ActionDescriptionGenerator.generate(
			sheet,
			new ApplyRoleAbility({ability: new RoleAbilityFake(), source: RoleName.warrior}),
		);

		expect(description).toBe('Guerreiro: habilidade Ataque Especial adicionada.');
	});

	it('should generate addPerLevelModifierToLifePoints description removing level 1', () => {
		const sheet = new BuildingSheetFake();

		const description = ActionDescriptionGenerator.generate(
			sheet,
			new AddPerLevelModifierToLifePoints({modifier: new PerLevelModifier(RaceAbilityName.hardAsRock, 1, false)}),
		);

		expect(description).toBe('Duro como pedra: +1 PV por nível após o nível 1.');
	});

	it('should generate addPerLevelModifierToLifePoints description', () => {
		const sheet = new BuildingSheetFake();

		const description = ActionDescriptionGenerator.generate(
			sheet,
			new AddPerLevelModifierToLifePoints({modifier: new PerLevelModifier(RaceAbilityName.hardAsRock, 1, true)}),
		);

		expect(description).toBe('Duro como pedra: +1 PV por nível.');
	});

	it('should generate addPerLevelModifierToManaPoints description', () => {
		const sheet = new BuildingSheetFake();

		const description = ActionDescriptionGenerator.generate(
			sheet,
			new AddPerLevelModifierToManaPoints({modifier: new PerLevelModifier(RoleName.warrior, 3, true)}),
		);

		expect(description).toBe('Guerreiro: +3 PM por nível.');
	});

	it('should generate addPerLevelModifierToManaPoints description', () => {
		const sheet = new BuildingSheetFake();

		const description = ActionDescriptionGenerator.generate(
			sheet,
			new AddPerLevelModifierToManaPoints({modifier: new PerLevelModifier(RoleName.warrior, 3, false)}),
		);

		expect(description).toBe('Guerreiro: +3 PM por nível após o nível 1.');
	});

	it('should generate addPerLevelModifierToManaPoints description', () => {
		const sheet = new BuildingSheetFake();

		const description = ActionDescriptionGenerator.generate(
			sheet,
			new AddPerLevelModifierToManaPoints({modifier: new PerLevelModifier(RoleName.warrior, 3, false, new Set(['wisdom', 'charisma']))}),
		);

		expect(description).toBe('Guerreiro: +3 PM (+ Sabedoria/Carisma) por nível após o nível 1.');
	});

	it('should generate trainIntelligenceSkills description', () => {
		const sheet = new BuildingSheetFake();

		const description = ActionDescriptionGenerator.generate(
			sheet,
			new TrainIntelligenceSkills({
				skills: [SkillName.acrobatics, SkillName.aim],
			}),
		);

		expect(description).toBe('Perícias treinadas pela inteligência: Acrobacia, Pontaria.');
	});

	it('should generate trainIntelligenceSkills description', () => {
		const sheet = new BuildingSheetFake();

		const description = ActionDescriptionGenerator.generate(
			sheet,
			new TrainIntelligenceSkills({
				skills: [],
			}),
		);

		expect(description).toBe('Nenhuma perícia treinada pela inteligência.');
	});

	it('should generate addEquipment description', () => {
		const sheet = new BuildingSheetFake();

		const description = ActionDescriptionGenerator.generate(
			sheet,
			new AddEquipment({
				equipment: new Equipment(EquipmentName.sacredSymbol),
				source: OriginName.acolyte,
			}),
		);

		expect(description).toBe('Acólito: Símbolo Sagrado adicionado ao inventário.');
	});

	it('should generate pickOriginPower description', () => {
		const sheet = new BuildingSheetFake();

		const description = ActionDescriptionGenerator.generate(
			sheet,
			new PickOriginPower({
				power: new ChurchMember(),
			}),
		);

		expect(description).toBe('Acólito: poder Membro da Igreja escolhido.');
	});

	it('should generate chooseOrigin description', () => {
		const sheet = new BuildingSheetFake();

		const description = ActionDescriptionGenerator.generate(
			sheet,
			new ChooseOrigin({
				origin: new OriginFake(),
			}),
		);

		expect(description).toBe('Origem escolhida: Acólito.');
	});
});
