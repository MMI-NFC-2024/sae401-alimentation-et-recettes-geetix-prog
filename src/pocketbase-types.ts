import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Aliments = "Aliments",
	Etapes = "Etapes",
	RecetteAliments = "Recette_aliments",
	RecetteRegimes = "Recette_regimes",
	Recettes = "Recettes",
	Regimes = "Regimes",
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
	Users = "users",
}

export type IsoDateString = string
export type IsoAutoDateString = string & { readonly autodate: unique symbol }
export type RecordIdString = string
export type FileNameString = string & { readonly filename: unique symbol }
export type HTMLString = string

type ExpandType<T> = unknown extends T
	? T extends unknown
		? { expand?: unknown }
		: { expand: T }
	: { expand: T }

export type BaseSystemFields<T = unknown> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
} & ExpandType<T>

export type AuthSystemFields<T = unknown> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

export enum AlimentsCategorieOptions {
	"légume" = "légume",
	"fruit" = "fruit",
	"viande" = "viande",
}
export type AlimentsRecord = {
	calories?: number
	categorie?: AlimentsCategorieOptions
	created: IsoAutoDateString
	glucides?: number
	id: string
	image?: FileNameString
	lipides?: number
	nom: string
	proteines?: number
	updated: IsoAutoDateString
}

export type EtapesRecord = {
	created: IsoAutoDateString
	description?: string
	id: string
	numero?: number
	recette: RecordIdString[]
	updated: IsoAutoDateString
}

export enum RecetteAlimentsUniteOptions {
	"g" = "g",
	"ml" = "ml",
	"c.à.s" = "c.à.s",
	"pièce" = "pièce",
}
export type RecetteAlimentsRecord = {
	aliment?: RecordIdString[]
	created: IsoAutoDateString
	id: string
	quantite?: number
	recette?: RecordIdString[]
	unite?: RecetteAlimentsUniteOptions
	updated: IsoAutoDateString
}

export type RecetteRegimesRecord = {
	created: IsoAutoDateString
	id: string
	recette?: RecordIdString
	regime?: RecordIdString
	updated: IsoAutoDateString
}

export enum RecettesDifficulteOptions {
	"facile" = "facile",
	"moyen" = "moyen",
	"difficile" = "difficile",
}
export enum RecettesObjectifOptions {
	"prendre de la masse" = "prendre de la masse",
	"perdre du poids" = "perdre du poids",
	"manger sain" = "manger sain",
	"booster son énergie" = "booster son énergie",
}

export type RecettesRecord = {
	created: IsoAutoDateString
	description?: string
	difficulte?: RecettesDifficulteOptions
	id: string
	image?: FileNameString
	nb_portions?: number
	note_moyenne?: number
	objectif?: RecettesObjectifOptions[]
	temps_preparation?: number
	titre: string
	updated: IsoAutoDateString
}

export enum RegimesObjectifOptions {
	"perte" = "perte",
	"prise" = "prise",
	"maintien" = "maintien",
}
export type RegimesRecord = {
	created: IsoAutoDateString
	description?: string
	id: string
	nom?: string
	objectif?: RegimesObjectifOptions
	updated: IsoAutoDateString
}

export type AuthoriginsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated: IsoAutoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated: IsoAutoDateString
}

export type MfasRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	method: string
	recordRef: string
	updated: IsoAutoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated: IsoAutoDateString
}

export type SuperusersRecord = {
	created: IsoAutoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated: IsoAutoDateString
	verified?: boolean
}

export type UsersRecord = {
	avatar?: FileNameString
	created: IsoAutoDateString
	email: string
	emailVisibility?: boolean
	id: string
	nom?: string
	password: string
	regime?: RecordIdString
	tokenKey: string
	updated: IsoAutoDateString
	verified?: boolean
}

export type AlimentsResponse<Texpand = unknown> = Required<AlimentsRecord> & BaseSystemFields<Texpand>
export type EtapesResponse<Texpand = unknown> = Required<EtapesRecord> & BaseSystemFields<Texpand>
export type RecetteAlimentsResponse<Texpand = unknown> = Required<RecetteAlimentsRecord> & BaseSystemFields<Texpand>
export type RecetteRegimesResponse<Texpand = unknown> = Required<RecetteRegimesRecord> & BaseSystemFields<Texpand>
export type RecettesResponse<Texpand = unknown> = Required<RecettesRecord> & BaseSystemFields<Texpand>
export type RegimesResponse<Texpand = unknown> = Required<RegimesRecord> & BaseSystemFields<Texpand>
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

export type CollectionRecords = {
	Aliments: AlimentsRecord
	Etapes: EtapesRecord
	Recette_aliments: RecetteAlimentsRecord
	Recette_regimes: RecetteRegimesRecord
	Recettes: RecettesRecord
	Regimes: RegimesRecord
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	users: UsersRecord
}

export type CollectionResponses = {
	Aliments: AlimentsResponse
	Etapes: EtapesResponse
	Recette_aliments: RecetteAlimentsResponse
	Recette_regimes: RecetteRegimesResponse
	Recettes: RecettesResponse
	Regimes: RegimesResponse
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	users: UsersResponse
}

type ProcessCreateAndUpdateFields<T> = Omit<{
	[K in keyof T as Extract<T[K], IsoAutoDateString> extends never ? K : never]:
		T[K] extends infer U ?
			U extends (FileNameString | FileNameString[]) ? 
				U extends any[] ? File[] : File 
			: U
		: never
}, 'id'>

export type CreateAuth<T> = {
	id?: RecordIdString
	email: string
	emailVisibility?: boolean
	password: string
	passwordConfirm: string
	verified?: boolean
} & ProcessCreateAndUpdateFields<T>

export type CreateBase<T> = {
	id?: RecordIdString
} & ProcessCreateAndUpdateFields<T>

export type UpdateAuth<T> = Partial<
	Omit<ProcessCreateAndUpdateFields<T>, keyof AuthSystemFields>
> & {
	email?: string
	emailVisibility?: boolean
	oldPassword?: string
	password?: string
	passwordConfirm?: string
	verified?: boolean
}

export type UpdateBase<T> = Partial<
	Omit<ProcessCreateAndUpdateFields<T>, keyof BaseSystemFields>
>

export type Create<T extends keyof CollectionResponses> =
	CollectionResponses[T] extends AuthSystemFields
		? CreateAuth<CollectionRecords[T]>
		: CreateBase<CollectionRecords[T]>

export type Update<T extends keyof CollectionResponses> =
	CollectionResponses[T] extends AuthSystemFields
		? UpdateAuth<CollectionRecords[T]>
		: UpdateBase<CollectionRecords[T]>

export type TypedPocketBase = {
	collection<T extends keyof CollectionResponses>(
		idOrName: T
	): RecordService<CollectionResponses[T]>
} & PocketBase
