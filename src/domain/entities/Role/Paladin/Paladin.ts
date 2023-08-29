import {Proficiency} from '../../Sheet';
import {SkillName} from '../../Skill';
import {Role} from '../Role';
import {type RoleAbilitiesPerLevel} from '../RoleAbilitiesPerLevel';
import {RoleAbilitiesPerLevelFactory} from '../RoleAbilitiesPerLevelFactory';
import {RoleName} from '../RoleName';
import {type SerializedRoles} from '../SerializedRole';

// Pontos de Vida. Um paladino começa com
// 20 pontos de vida + Constituição e ganha 5 PV +
// Constituição por nível.
// Pontos de Mana. 3 PM por nível.
// Perícias. Luta (For) e Vontade (Sab) mais 2
// a sua escolha entre Adestramento (Car), Atletismo
// (For), Cavalgar (Des), Cura (Sab), Diplomacia (Car),
// Fortitude (Con), Guerra (Int), Iniciativa (Des), Intuição
// (Sab), Nobreza (Int), Percepção (Sab) e Religião
// (Sab).
// Proficiências. Armas marciais, armaduras
// pesadas e escudos.

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

	override initialLifePoints = 20;
	override lifePointsPerLevel = 5;
	override manaPerLevel = 3;
	override mandatorySkills: SkillName[] = [SkillName.fight, SkillName.will];
	override proficiencies: Proficiency[] = [Proficiency.martial, Proficiency.heavyArmor, Proficiency.shield];
	override readonly name = RoleName.paladin;
	override abilitiesPerLevel: RoleAbilitiesPerLevel = RoleAbilitiesPerLevelFactory.make({});

	constructor(chosenSkills: SkillName[]) {
		super(chosenSkills, Paladin.selectSkillGroups);
	}

	protected override serializeSpecific(): SerializedRoles {
		return {
			name: this.name,
		};
	}
}
