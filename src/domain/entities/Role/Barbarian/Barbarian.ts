import {Level, Proficiency} from '../../Sheet';
import {SkillName} from '../../Skill';
import {Role} from '../Role';
import {RoleAbilitiesPerLevelFactory} from '../RoleAbilitiesPerLevelFactory';
import {type RoleAbility} from '../RoleAbility';
import {type SelectSkillGroup} from '../RoleInterface';
import {RoleName} from '../RoleName';
import {type SerializedBarbarian} from '../SerializedRole';
import {Rage} from './Rage/Rage';

export class Barbarian extends Role<SerializedBarbarian> {
	static readonly roleName = RoleName.barbarian;
	static readonly selectSkillGroups: SelectSkillGroup[] = [
		{amount: 4, skills: [
			SkillName.animalHandling,
			SkillName.athletics,
			SkillName.animalRide,
			SkillName.initiative,
			SkillName.intimidation,
			SkillName.craft,
			SkillName.perception,
			SkillName.aim,
			SkillName.survival,
			SkillName.will,
		]},
	];

	static initialLifePoints = 24;
	static lifePointsPerLevel = 6;
	static manaPerLevel = 3;
	static mandatorySkills: SkillName[] = [SkillName.fight, SkillName.fortitude];
	static proficiencies: Proficiency[] = [Proficiency.martial, Proficiency.shield];

	override initialLifePoints = Barbarian.initialLifePoints;
	override lifePointsPerLevel = Barbarian.lifePointsPerLevel;
	override manaPerLevel = Barbarian.manaPerLevel;
	override mandatorySkills = Barbarian.mandatorySkills;
	override proficiencies = Barbarian.proficiencies;
	override readonly name = Barbarian.roleName;
	readonly abilitiesPerLevel: Record<Level, Record<string, RoleAbility>> = RoleAbilitiesPerLevelFactory.make({
		[Level.one]: {
			rage: new Rage(),
		},
	});

	constructor(chosenSkills: SkillName[] = []) {
		super(chosenSkills, Barbarian.selectSkillGroups);
	}

	protected override serializeSpecific(): SerializedBarbarian {
		return {
			name: Barbarian.roleName,
		};
	}
}
