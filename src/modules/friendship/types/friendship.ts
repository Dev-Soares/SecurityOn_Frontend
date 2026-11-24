export interface UserSummary {
  id: string;
  name: string;
}

// Uma amizade é UMA linha: quem pediu, quem recebeu, e o status.
export interface Friendship {
  id: string;
  requesterId: string;
  addresseeId: string;
  status: 'PENDING' | 'ACCEPTED';
  createdAt: string;
}

export type FriendshipRelation =
  | 'self'
  | 'none'
  | 'friends'
  | 'pending_sent'
  | 'pending_received';

// Relação entre o usuário logado e o perfil visitado, é o que decide qual
// botão aparece.
export interface FriendshipStatus {
  userId: string;
  relation: FriendshipRelation;
  friendshipId: string | null;
}

export interface FriendSummary {
  friendshipId: string;
  friendsSince: string;
  user: UserSummary;
}

export interface ReceivedRequest extends Friendship {
  requester: UserSummary;
}

export interface SentRequest extends Friendship {
  addressee: UserSummary;
}

export interface PaginatedFriendship<T> {
  nextCursor: string | null;
  hasNextPage: boolean;
  data: T[];
}
