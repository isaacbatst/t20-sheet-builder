import {Proficiency} from '../../Sheet';
import {SkillName} from '../../Skill';
import {Role} from '../Role';
import {type RoleAbilitiesPerLevel} from '../RoleAbilitiesPerLevel';
import {RoleAbilitiesPerLevelFactory} from '../RoleAbilitiesPerLevelFactory';
import {type SelectSkillGroup} from '../RoleInterface';
import {RoleName} from '../RoleName';
import {type SerializedBard} from '../SerializedRole';

export class Bard extends Role<SerializedBard> {
	static readonly roleName = RoleName.bard;
	static initialLifePoints = 12;
	static lifePointsPerLevel = 3;
	static manaPerLevel = 4;
	static mandatorySkills: SkillName[] = [SkillName.acting, SkillName.reflexes];
	static proficiencies: Proficiency[] = [Proficiency.martial];

	static selectSkillGroups: SelectSkillGroup[] = [
		{
			amount: 6,
			skills: [
				SkillName.acrobatics,
				SkillName.animalRide,
				SkillName.knowledge,
				SkillName.diplomacy,
				SkillName.cheat,
				SkillName.stealth,
				SkillName.initiative,
				SkillName.intuition,
				SkillName.investigation,
				SkillName.gambling,
				SkillName.thievery,
				SkillName.fight,
				SkillName.mysticism,
				SkillName.nobility,
				SkillName.perception,
				SkillName.aim,
				SkillName.will,
			],
		},
	];

	override initialLifePoints = Bard.initialLifePoints;
	override lifePointsPerLevel = Bard.lifePointsPerLevel;
	override manaPerLevel = Bard.manaPerLevel;
	override mandatorySkills = Bard.mandatorySkills;
	override proficiencies = Bard.proficiencies;
	override readonly name = Bard.roleName;
	override abilitiesPerLevel: RoleAbilitiesPerLevel = RoleAbilitiesPerLevelFactory.make({});

	constructor(chosenSkills: SkillName[]) {
		super(chosenSkills, Bard.selectSkillGroups);
	}

	protected override serializeSpecific(): SerializedBard {
		return {
			name: this.name,
		};
	}
}
