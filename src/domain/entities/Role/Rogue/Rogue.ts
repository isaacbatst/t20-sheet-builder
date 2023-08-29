import {type Proficiency} from '../../Sheet';
import {SkillName} from '../../Skill';
import {Role} from '../Role';
import {type RoleAbilitiesPerLevel} from '../RoleAbilitiesPerLevel';
import {RoleAbilitiesPerLevelFactory} from '../RoleAbilitiesPerLevelFactory';
import {RoleName} from '../RoleName';
import {type SerializedRogue} from '../SerializedRole';

export class Rogue extends Role<SerializedRogue> {
	static selectSkillGroups = [
		{
			amount: 8,
			skills: [
				SkillName.acrobatics,
				SkillName.athletics,
				SkillName.acting,
				SkillName.animalRide,
				SkillName.knowledge,
				SkillName.diplomacy,
				SkillName.cheat,
				SkillName.stealth,
				SkillName.intuition,
				SkillName.intimidation,
				SkillName.investigation,
				SkillName.gambling,
				SkillName.fight,
				SkillName.craft,
				SkillName.perception,
				SkillName.piloting,
				SkillName.aim,
			],
		},
	];

	override initialLifePoints = 12;
	override lifePointsPerLevel = 3;
	override manaPerLevel = 4;
	override mandatorySkills: SkillName[] = [SkillName.thievery, SkillName.reflexes];
	override proficiencies: Proficiency[] = [];
	override readonly name = RoleName.rogue;
	override abilitiesPerLevel: RoleAbilitiesPerLevel = RoleAbilitiesPerLevelFactory.make({});

	constructor(chosenSkills: SkillName[]) {
		super(chosenSkills, Rogue.selectSkillGroups);
	}

	protected override serializeSpecific(): SerializedRogue {
		return {
			name: this.name,
		};
	}
}
