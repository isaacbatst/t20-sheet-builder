import {Level, Proficiency} from '../../Sheet';
import {SkillName} from '../../Skill';
import {Role} from '../Role';
import {type RoleAbilitiesPerLevel} from '../RoleAbilitiesPerLevel';
import {RoleAbilitiesPerLevelFactory} from '../RoleAbilitiesPerLevelFactory';
import {RoleAbilityName} from '../RoleAbilityName';
import {RoleName} from '../RoleName';
import {type SerializedRoles} from '../SerializedRole';
import {Blessed} from './Blessed/Blessed';
import {DivineBlow} from './DivineBlow/DivineBlow';
import {HeroCode} from './HeroCode/HeroCode';

export class Paladin extends Role {
	static selectSkillGroups = [
		{
			amount: 2,
			skills: [
				SkillName.animalHandling,
				SkillName.athletics,
				SkillName.animalRide,
				SkillName.cure,
				SkillName.diplomacy,
				SkillName.fortitude,
				SkillName.war,
				SkillName.initiative,
				SkillName.intuition,
				SkillName.nobility,
				SkillName.perception,
				SkillName.religion,
			],
		},
	];

	static initialLifePoints = 20;
	static lifePointsPerLevel = 5;
	static manaPerLevel = 3;
	static mandatorySkills: SkillName[] = [SkillName.fight, SkillName.will];
	static proficiencies: Proficiency[] = [Proficiency.martial, Proficiency.heavyArmor, Proficiency.shield];
	static readonly roleName = RoleName.paladin;

	override initialLifePoints = Paladin.initialLifePoints;
	override lifePointsPerLevel = Paladin.lifePointsPerLevel;
	override manaPerLevel = Paladin.manaPerLevel;
	override mandatorySkills = Paladin.mandatorySkills;
	override proficiencies = Paladin.proficiencies;
	override readonly name = Paladin.roleName;
	override abilitiesPerLevel: RoleAbilitiesPerLevel = RoleAbilitiesPerLevelFactory.make({
		[Level.one]: {
			[RoleAbilityName.blessed]: new Blessed(),
			[RoleAbilityName.heroCode]: new HeroCode(),
			[RoleAbilityName.divineBlow]: new DivineBlow(),
		},
	});

	constructor(chosenSkills: SkillName[][]) {
		super(chosenSkills, Paladin.selectSkillGroups);
	}

	protected override serializeSpecific(): SerializedRoles {
		return {
			name: this.name,
		};
	}
}
