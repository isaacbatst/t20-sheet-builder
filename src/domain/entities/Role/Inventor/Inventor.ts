import {Level, type Proficiency} from '../../Sheet';
import {SkillName} from '../../Skill';
import {Role} from '../Role';
import {type RoleAbilitiesPerLevel} from '../RoleAbilitiesPerLevel';
import {RoleAbilitiesPerLevelFactory} from '../RoleAbilitiesPerLevelFactory';
import {RoleAbilityName} from '../RoleAbilityName';
import {type SelectSkillGroup} from '../RoleInterface';
import {RoleName} from '../RoleName';
import {type SerializedInventor} from '../SerializedRole';
import {Ingenuity} from './Ingenuity/Ingenuity';
import {Prototype} from './Prototype/Prototype';
import {type PrototypeParams} from './Prototype/PrototypeEffect';

export class Inventor extends Role<SerializedInventor> {
	static selectSkillGroups: SelectSkillGroup[] = [
		{
			amount: 4,
			skills: [
				SkillName.knowledge,
				SkillName.cure,
				SkillName.diplomacy,
				SkillName.fortitude,
				SkillName.initiative,
				SkillName.investigation,
				SkillName.fight,
				SkillName.mysticism,
				SkillName.craft,
				SkillName.piloting,
				SkillName.perception,
				SkillName.aim,
			],
		},
	];

	static initialLifePoints = 12;
	static lifePointsPerLevel = 3;
	static manaPerLevel = 4;
	static mandatorySkills: SkillName[] = [SkillName.craft, SkillName.will];
	static proficiencies: Proficiency[] = [];
	static readonly roleName = RoleName.inventor;

	override initialLifePoints = Inventor.initialLifePoints;
	override lifePointsPerLevel = Inventor.lifePointsPerLevel;
	override manaPerLevel = Inventor.manaPerLevel;
	override mandatorySkills = Inventor.mandatorySkills;
	override proficiencies = Inventor.proficiencies;
	readonly name = Inventor.roleName;
	override abilitiesPerLevel: RoleAbilitiesPerLevel;

	constructor(chosenSkills: SkillName[][], prototypeParams: PrototypeParams) {
		super(chosenSkills, Inventor.selectSkillGroups);
		this.abilitiesPerLevel = RoleAbilitiesPerLevelFactory.make({
			[Level.one]: {
				[RoleAbilityName.ingenuity]: new Ingenuity(),
				[RoleAbilityName.prototype]: new Prototype(prototypeParams),
			},
		});
	}

	protected override serializeSpecific(): SerializedInventor {
		return {
			name: this.name,
		};
	}
}
