import {Proficiency} from '../../Sheet';
import {SkillName} from '../../Skill';
import {Role} from '../Role';
import {type RoleAbilitiesPerLevel} from '../RoleAbilitiesPerLevel';
import {RoleAbilitiesPerLevelFactory} from '../RoleAbilitiesPerLevelFactory';
import {type SelectSkillGroup} from '../RoleInterface';
import {RoleName} from '../RoleName';
import {type SerializedBard} from '../SerializedRole';

export class Bard extends Role<SerializedBard> {
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

	override initialLifePoints = 12;
	override lifePointsPerLevel = 3;
	override manaPerLevel = 4;
	override mandatorySkills: SkillName[] = [SkillName.acting, SkillName.reflexes];
	override proficiencies: Proficiency[] = [Proficiency.martial];
	override readonly name = RoleName.bard;
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
