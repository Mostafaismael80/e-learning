import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { createContext } from "react";
import { useState } from "react";

export let authContext = createContext();

export default function AuthContextProvider(props) {
  const [token, settoken] = useState(localStorage.getItem("token"));
  const [NumOfCartItems, setNumOfCartItems] = useState(null);
  const [TotalCartPrice, setTotalCartPrice] = useState(null);
  const [ProductsCart, setProductsCart] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [CartIdPay, setCartIdPay] = useState(null);
  const [WishId, setWishId] = useState(null);
  const [Ids, setIds] = useState(null);

async function getWishList() {
    setisLoading(true);
    return await axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
          token,
        },
      })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((error) => {
        console.log(error);
        return error;
      })
      .finally(() => {
        setisLoading(false);
      });
  }

  async function callApiWish(WishId) {
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: WishId,
        },
        {
          headers: {
            token,
          },
        }
      )
      .then((res) => {
        setWishId(WishId);
        console.log(res.data.data);
        setIds(res.data.data);
        return res;
      })
      .catch((error) => {
        console.log(error);

        return error;
      });
  }

  async function callApiProduct(productId) {
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId,
        },
        {
          headers: {
            token,
          },
        }
      )
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }

  async function getCart() {
    setisLoading(true);
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token,
        },
      })
      .then((res) => {
        setNumOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setProductsCart(res.data.data.products);
        setCartIdPay(res.data.cartId);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setisLoading(false);
      });
  }

  async function removeItem(id) {
    setisLoading(true);
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: {
          token,
        },
      })
      .then((res) => {
        setNumOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setProductsCart(res.data.data.products);
        return true;
      })
      .catch((error) => {
        return false;
      })
      .finally(() => {
        setisLoading(false);
      });
  }

  async function updateItem(id, count) {
    await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        {
          headers: {
            token,
          },
        }
      )
      .then((res) => {
        setTotalCartPrice(res.data.data.totalCartPrice);
        setProductsCart(res.data.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <authContext.Provider
      value={{
        getWishList,
        Ids,
        WishId,
        callApiWish,
        CartIdPay,
        updateItem,
        removeItem,
        isLoading,
        token,
        settoken,
        callApiProduct,
        getCart,
        ProductsCart,
        TotalCartPrice,
        NumOfCartItems,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
}
