/**
* This file was @generated using pocketbase-typegen
*/

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

// Alias types for improved usability
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

// System fields
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

// Record types for each collection

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
export type RecettesRecord = {
	created: IsoAutoDateString
	description?: string
	difficulte?: RecettesDifficulteOptions
	id: string
	image?: FileNameString
	nb_portions?: number
	note_moyenne?: number
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

// Response types include system fields and match responses from the PocketBase API
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

// Types containing all Records and Responses, useful for creating typing helper functions

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

// Utility types for create/update operations

type ProcessCreateAndUpdateFields<T> = Omit<{
	// Omit AutoDate fields
	[K in keyof T as Extract<T[K], IsoAutoDateString> extends never ? K : never]: 
		// Convert FileNameString to File
		T[K] extends infer U ? 
			U extends (FileNameString | FileNameString[]) ? 
				U extends any[] ? File[] : File 
			: U
		: never
}, 'id'>

// Create type for Auth collections
export type CreateAuth<T> = {
	id?: RecordIdString
	email: string
	emailVisibility?: boolean
	password: string
	passwordConfirm: string
	verified?: boolean
} & ProcessCreateAndUpdateFields<T>

// Create type for Base collections
export type CreateBase<T> = {
	id?: RecordIdString
} & ProcessCreateAndUpdateFields<T>

// Update type for Auth collections
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

// Update type for Base collections
export type UpdateBase<T> = Partial<
	Omit<ProcessCreateAndUpdateFields<T>, keyof BaseSystemFields>
>

// Get the correct create type for any collection
export type Create<T extends keyof CollectionResponses> =
	CollectionResponses[T] extends AuthSystemFields
		? CreateAuth<CollectionRecords[T]>
		: CreateBase<CollectionRecords[T]>

// Get the correct update type for any collection
export type Update<T extends keyof CollectionResponses> =
	CollectionResponses[T] extends AuthSystemFields
		? UpdateAuth<CollectionRecords[T]>
		: UpdateBase<CollectionRecords[T]>

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = {
	collection<T extends keyof CollectionResponses>(
		idOrName: T
	): RecordService<CollectionResponses[T]>
} & PocketBase
