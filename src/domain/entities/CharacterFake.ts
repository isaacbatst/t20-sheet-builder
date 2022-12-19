import type {Attributes} from './Attributes';
import type {AttributesCharacter, LeveledCharacter, OtherModifierAdderCharacter, SkilledCharacter} from './Character';
import type {SkillNameEnum} from './Skill/SkillName';

export class CharacterFake implements SkilledCharacter, LeveledCharacter, AttributesCharacter, OtherModifierAdderCharacter {
	public level = 1;
	public attributes: Attributes = {
		charisma: 0,
		constitution: 0,
		dexterity: 0,
		intelligence: 0,
		strength: 0,
		wisdom: 0,
	};

	private readonly trainedSkills: SkillNameEnum[] = [];
	private readonly defenseOtherModifiers: Array<{sourceName: string; value: number}> = [];

	getTrainedSkills() {
		return this.trainedSkills;
	}

	trainSkill(name: SkillNameEnum): void {
		this.trainedSkills.push(name);
	}

	getLevel(): number {
		return this.level;
	}

	getAttributes(): Attributes {
		return this.attributes;
	}

	getDefenseOtherModifiers() {
		return this.defenseOtherModifiers;
	}

	addOtherModifierToDefense(sourceName: string, value: number): void {
		this.defenseOtherModifiers.push({sourceName, value});
	}
}
