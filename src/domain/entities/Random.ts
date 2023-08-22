export type RandomInterface = {
	get(min: number, max: number): number;
};

export class Random implements RandomInterface {
	get(min: number, max: number): number {
		return Math.floor((Math.random() * (max - min + 1)) + min);
	}
}
