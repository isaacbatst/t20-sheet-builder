import {Proficiency} from '../../Sheet';
import {SkillName} from '../../Skill';
import {Role} from '../Role';
import {type RoleAbilitiesPerLevel} from '../RoleAbilitiesPerLevel';
import {RoleAbilitiesPerLevelFactory} from '../RoleAbilitiesPerLevelFactory';
import {type SelectSkillGroup} from '../RoleInterface';
import {RoleName} from '../RoleName';
import {type SerializedKnight} from '../SerializedRole';

export class Knight extends Role<SerializedKnight> {
	static selectSkillGroups: SelectSkillGroup[] = [
		{
			amount: 2,
			skills: [
				SkillName.animalHandling,
				SkillName.athletics,
				SkillName.animalRide,
				SkillName.diplomacy,
				SkillName.war,
				SkillName.initiative,
				SkillName.intimidation,
				SkillName.nobility,
				SkillName.perception,
				SkillName.will,
			],
		},
	];

	static initialLifePoints = 20;
	static lifePointsPerLevel = 5;
	static manaPerLevel = 3;
	static mandatorySkills: SkillName[] = [SkillName.fight, SkillName.fortitude];
	static proficiencies: Proficiency[] = [Proficiency.martial, Proficiency.heavyArmor, Proficiency.shield];
	static readonly roleName = RoleName.knight;

	override initialLifePoints = Knight.initialLifePoints;
	override lifePointsPerLevel = Knight.lifePointsPerLevel;
	override manaPerLevel = Knight.manaPerLevel;
	override mandatorySkills = Knight.mandatorySkills;
	override proficiencies = Knight.proficiencies;
	override readonly name = Knight.roleName;
	override abilitiesPerLevel: RoleAbilitiesPerLevel = RoleAbilitiesPerLevelFactory.make({});

	constructor(chosenSkills: SkillName[]) {
		super(chosenSkills, Knight.selectSkillGroups);
	}

	protected override serializeSpecific(): SerializedKnight {
		return {
			name: this.name,
		};
	}
}
