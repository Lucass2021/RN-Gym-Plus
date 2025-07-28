import FavoriteComponent from "@/assets/icons/favorite";
import FavoriteFillComponent from "@/assets/icons/favorite-fill";

export const iconRegistry = {
  favorite: FavoriteComponent,
  favoriteFill: FavoriteFillComponent,
};

export type IconName = keyof typeof iconRegistry;
