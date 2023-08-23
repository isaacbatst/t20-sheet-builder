export type RollResultParams = {
	total: number;
	rolls: number[];
	discartedRolls: number[];
};

export class RollResult {
	total: number;
	readonly rolls: number[];
	readonly discartedRolls: number[];

	constructor(params: RollResultParams) {
		this.total = params.total;
		this.rolls = params.rolls;
		this.discartedRolls = params.discartedRolls;
	}

	append(rollResult: RollResult) {
		this.total += rollResult.total;
		this.rolls.push(...rollResult.rolls);
		this.discartedRolls.push(...rollResult.discartedRolls);
	}
}
