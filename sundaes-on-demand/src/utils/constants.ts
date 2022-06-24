type PRICE_PER_ITEM_TYPE = "scoops" | "toppings";

type PRICE_PER_ITEM = {
  [key in PRICE_PER_ITEM_TYPE]: number;
};

export const PRICE_PER_ITEM: PRICE_PER_ITEM = {
  scoops: 2,
  toppings: 1.5,
};
