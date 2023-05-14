
export type Static<
	Class,
	// eslint-disable-next-line @typescript-eslint/ban-types
	StaticMembers extends object = object,
	ConstructorArgs extends any[] = any[],
> = (new(...args: ConstructorArgs) => Class) & StaticMembers;
