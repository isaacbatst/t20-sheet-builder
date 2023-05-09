import {type Vision} from './Vision';

export type SheetVisionInterface = {
	changeVision(vision: Vision): void;
	getVision(): Vision;
};
