import {type Proficiency} from '../../Sheet';
import {SkillName} from '../../Skill';
import {Role} from '../Role';
import {type RoleAbilitiesPerLevel} from '../RoleAbilitiesPerLevel';
import {RoleAbilitiesPerLevelFactory} from '../RoleAbilitiesPerLevelFactory';
import {type SelectSkillGroup} from '../RoleInterface';
import {RoleName} from '../RoleName';
import {type SerializedInventor} from '../SerializedRole';

export class Inventor extends Role<SerializedInventor> {
	static selectSkillGroups: SelectSkillGroup[] = [
		//     4 a sua escolha entre Conhecimento (Int), Cura (Sab),
		// Diplomacia (Car), Fortitude (Con), Iniciativa (Des),
		// Investigação (Int), Luta (For), Misticismo (Int),
		// Ofício (Int), Pilotagem (Des), Percepção (Sab) e
		// Pontaria (Des).
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
	override abilitiesPerLevel: RoleAbilitiesPerLevel = RoleAbilitiesPerLevelFactory.make({});

	constructor(chosenSkills: SkillName[]) {
		super(chosenSkills, Inventor.selectSkillGroups);
	}

	protected override serializeSpecific(): SerializedInventor {
		return {
			name: this.name,
		};
	}
}
