import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PRICE_PER_ITEM } from "../utils/constants";

interface OrderDetailsProviderProps {
  children: ReactNode;
}

interface optionCountsProps {
  [key: string]: Map<string, number>;
}

type OptionType = "scoops" | "toppings";

interface optionCountsTotalProps {
  scoops: number;
  toppings: number;
  grandTotal: number;
}

interface OrderDetailsContextData {
  //optionCounts: optionCountsProps,
  //totals: optionCountsTotalProps,
  //updateItemCount: () => void;
}

const OrderDetailsContext = createContext({} as OrderDetailsContextData);

function useOrderDetails() {
  const context = useContext(OrderDetailsContext);

  if (!context) {
    throw new Error(
      "OrderDetailsContext must be used within a OrderDetailsProvider"
    );
  }
  return context;
}

function OrderDetailsProvider(props: OrderDetailsProviderProps) {
  const [optionCounts, setOptionCounts] = useState<optionCountsProps>({
    scoops: new Map(),
    toppings: new Map(),
  });

  const [totals, setTotals] = useState<optionCountsTotalProps>({
    scoops: 0,
    toppings: 0,
    grandTotal: 0,
  });

  function calculateSubTotal(
    optionType: OptionType,
    optionCounts: optionCountsProps
  ) {
    let optionCount: number = 0;

    for (let count of optionCounts[optionType].values()) {
      optionCount += count;
    }
    return optionCount + PRICE_PER_ITEM[optionType];
  }

  useEffect(() => {
    const scoopsSubTotal: number = calculateSubTotal("scoops", optionCounts);
    const toppingSubTotal: number = calculateSubTotal("toppings", optionCounts);
    const grandTotal: number = scoopsSubTotal + toppingSubTotal;
    setTotals({
      scoops: scoopsSubTotal,
      toppings: toppingSubTotal,
      grandTotal,
    });
  });

  const value = useMemo(() => {
    function updateItemCount(
      itemName: string,
      newItemCount: string,
      optionType: OptionType
    ) {
      const newOptionCounts: optionCountsProps = { ...optionCounts };
      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));
      setOptionCounts(newOptionCounts);
    }
    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]);

  return <OrderDetailsContext.Provider value={value} {...props} />;
}

export { useOrderDetails, OrderDetailsProvider };
