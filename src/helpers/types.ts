export interface Session {
	provider_token?: string | null;
	access_token: string;
	expires_in?: number;
	expires_at?: number;
	refresh_token?: string;
	token_type: string;
	user: User | null;
}

export interface User {
	id: string;
	user_metadata: {
		[key: string]: any;
	};
	aud: string;
	confirmation_sent_at?: string;
	email?: string;
	created_at: string;
	confirmed_at?: string;
	last_sign_in_at?: string;
	role?: string;
	updated_at?: string;
}

export interface SupabaseError {
	message: string;
	status: number;
}

export interface ClothingItemType {
	clothing_type: number;
	created_datetime: string;
	id: string;
	name: string;
	nickname?: string;
	purchase_condition: string;
	purchase_date: string;
	purchase_price: number;
	user_id: string;
	is_retired: boolean;
}

export interface ClothingItemHistoryType {
	clothing_item: string;
	created_datetime: string;
	id: string;
	track_datetime: string;
	user_id: string;
}
