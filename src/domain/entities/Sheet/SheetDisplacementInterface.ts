export type SheetDisplacementInterface = {
	changeDisplacement(displacement: number): void;
	getDisplacement(): number;
	getClimbingDisplacement(): number | undefined;
	changeClimbingDisplacement(climbingDisplacement: number): void;
};
