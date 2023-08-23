import {DiceRoll, type SerializedDiceRoll} from '../Dice/DiceRoll';
import {type RollResult} from '../Dice/RollResult';
import {type RandomInterface} from '../Random';
import {type Attribute} from '../Sheet';
import {SkillName} from '../Skill';
import type {Critical, SerializedCritical} from './Critical';

export type SerializedAttack = {
	damage: SerializedDiceRoll;
	critical: SerializedCritical;
};

export class Attack {
	static test = new DiceRoll(1, 20);

	constructor(
		readonly damage: DiceRoll,
		readonly critical: Critical,
	) {}

	roll(random: RandomInterface): {
		damage: RollResult;
		test: RollResult;
	} {
		const testResult = this.rollTest(random);
		const isCritical = testResult.total >= this.critical.threat;

		const damageResult = this.rollDamage(random);

		if (isCritical) {
			for (let i = 1; i < this.critical.multiplier; i++) {
				damageResult.append(this.rollDamage(random));
			}
		}

		return {
			damage: damageResult,
			test: testResult,
		};
	}

	rollTest(random: RandomInterface): RollResult {
		const damageResult = Attack.test.roll(random);
		return damageResult;
	}

	rollDamage(random: RandomInterface): RollResult {
		return this.damage.roll(random);
	}

	getTestDefaultSkill() {
		return SkillName.fight;
	}

	getCustomTestAttributes(): Set<Attribute> {
		return new Set(['strength']);
	}

	serialize(): SerializedAttack {
		return {
			damage: this.damage.serialize(),
			critical: this.critical.serialize(),
		};
	}
}
