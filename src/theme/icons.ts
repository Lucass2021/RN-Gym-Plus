import FavoriteComponent from "@/assets/icons/favorite";
import FavoriteFillComponent from "@/assets/icons/favorite-fill";
import GenderComponent from "@/assets/icons/gender";
import HeightComponent from "@/assets/icons/height";
import TrainingComponent from "@/assets/icons/training";
import WeightComponent from "@/assets/icons/weight";

export const iconRegistry = {
  favorite: FavoriteComponent,
  favoriteFill: FavoriteFillComponent,
  gender: GenderComponent,
  height: HeightComponent,
  weight: WeightComponent,
  training: TrainingComponent,
};

export type IconName = keyof typeof iconRegistry;
