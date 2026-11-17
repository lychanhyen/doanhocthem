import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { subscribeCart } from "../cartStorage";
import { syncFromStorage } from "./cartSlice";
function CartBridge({ children }) {
  const dispatch = useDispatch();
  useEffect(function () {
    const unsubscribe = subscribeCart(function () {
      dispatch(syncFromStorage());
    });
    return unsubscribe;
  }, [dispatch]);
  return children;
}
export default CartBridge;