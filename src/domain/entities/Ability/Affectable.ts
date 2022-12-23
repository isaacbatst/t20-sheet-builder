export type AffectableType = 'area' | 'target';
export type Affectable = {
	type: AffectableType;
	value: string;
};
export type AffectableArea = Affectable & {
	type: 'area';
	value: 'square' | 'sphere';
};

export type AffectableTarget = Affectable & {
	type: 'target';
	value: 'self' | 'creature' | 'object';
};
