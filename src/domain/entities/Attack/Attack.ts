import {type DiceRoll, type SerializedDiceRoll} from '../Dice/DiceRoll';
import {type RollResult} from '../Dice/RollResult';
import {type RandomInterface} from '../Random';
import {type Attribute} from '../Sheet';
import {SkillName} from '../Skill';
import {type SkillRollResult, type SheetSkill} from '../Skill/SheetSkill';
import {type TranslatableName} from '../Translator';
import type {Critical, SerializedCritical} from './Critical';

export type SerializedAttack = {
	damage: SerializedDiceRoll;
	critical: SerializedCritical;
	name: TranslatableName;
};

export class Attack {
	constructor(
		readonly damage: DiceRoll,
		readonly critical: Critical,
		readonly name: TranslatableName,
	) {}

	roll(random: RandomInterface, skill: SheetSkill): {
		damage: RollResult;
		test: SkillRollResult;
	} {
		const test = skill.roll(random, this.critical.threat);
		const damage = this.rollDamage(random);

		if (test.isCritical) {
			for (let i = 1; i < this.critical.multiplier; i++) {
				damage.append(this.rollDamage(random));
			}
		}

		return {
			test,
			damage,
		};
	}

	rollDamage(random: RandomInterface): RollResult {
		return this.damage.roll(random);
	}

	getTestDefaultSkill() {
		return SkillName.fight;
	}

	getDamageAttribute(): Attribute | undefined {
		return undefined;
	}

	getCustomTestAttributes(): Set<Attribute> {
		return new Set(['strength']);
	}

	serialize(): SerializedAttack {
		return {
			damage: this.damage.serialize(),
			critical: this.critical.serialize(),
			name: this.name,
		};
	}
}
