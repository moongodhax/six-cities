export type Review = {
  id: string;
  comment: string;
  date: string;
  rating: number;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
};

export type ReviewData = {
  comment: string;
  rating: number;
  offerId: string;
};
