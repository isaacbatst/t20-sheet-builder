import {Level, Proficiency} from '../../Sheet';
import {SkillName} from '../../Skill';
import {Role} from '../Role';
import {type RoleAbilitiesPerLevel} from '../RoleAbilitiesPerLevel';
import {RoleAbilitiesPerLevelFactory} from '../RoleAbilitiesPerLevelFactory';
import {RoleAbilityName} from '../RoleAbilityName';
import {type SelectSkillGroup} from '../RoleInterface';
import {RoleName} from '../RoleName';
import {type SerializedRanger} from '../SerializedRole';
import {PreyMark} from './PreyMark/PreyMark';
import {Tracker} from './Tracker/Tracker';

export class Ranger extends Role<SerializedRanger> {
	static selectSkillGroups: SelectSkillGroup[] = [
		{
			amount: 1,
			skills: [SkillName.fight, SkillName.aim],
		},
		{
			amount: 6,
			skills: [
				SkillName.animalHandling,
				SkillName.athletics,
				SkillName.animalRide,
				SkillName.cure,
				SkillName.fortitude,
				SkillName.stealth,
				SkillName.initiative,
				SkillName.investigation,
				SkillName.fight,
				SkillName.craft,
				SkillName.perception,
				SkillName.aim,
				SkillName.reflexes,
			],
		},
	];

	static initialLifePoints = 16;
	static lifePointsPerLevel = 4;
	static manaPerLevel = 4;
	static mandatorySkills: SkillName[] = [SkillName.survival];
	static proficiencies: Proficiency[] = [Proficiency.martial, Proficiency.shield];
	static readonly roleName = RoleName.ranger;

	override initialLifePoints = Ranger.initialLifePoints;
	override lifePointsPerLevel = Ranger.lifePointsPerLevel;
	override manaPerLevel = Ranger.manaPerLevel;
	override mandatorySkills = Ranger.mandatorySkills;
	override proficiencies = Ranger.proficiencies;
	override readonly name = Ranger.roleName;
	override abilitiesPerLevel: RoleAbilitiesPerLevel = RoleAbilitiesPerLevelFactory.make({
		[Level.one]: {
			[RoleAbilityName.preyMark]: new PreyMark(),
			[RoleAbilityName.tracker]: new Tracker(),
		},
	});

	constructor(chosenSkills: SkillName[]) {
		super(chosenSkills, Ranger.selectSkillGroups);
	}

	protected override serializeSpecific(): SerializedRanger {
		return {
			name: this.name,
		};
	}
}
