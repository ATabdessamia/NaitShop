import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { createOrder } from "../actions/orderActions";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  const toDecimals = (num) => {
    return Math.round((num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = toDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
  );
  cart.shippingPrice = toDecimals(cart.itemsPrice > 200 ? 0 : 200);
  cart.taxPrice = toDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  return (
    <>
      <CheckoutSteps Current="3" History={history} />
      <div className="-mx-3.5 flex flex-wrap">
        <div className="px-5 w-full md:w-3/5 md:flex-basis-60 relative">
          <div className="flex flex-col pl-0 divide-y > * divide-gray-900 > * divide-opacity-20 text-opacity-70 text-gray-900 text-sm sm:text-base md:text-sm lg:text-base my-3 justify-center">
            <div className="py-3 relative block px-5">
              <h2 className="uppercase text-gray-700 py-2 text-lg sm:text-2xl font-medium tracking-widest">
                shipping
              </h2>
              <p className="mb-1">
                <strong className="font-normal mr-1 capitalize">
                  address:
                </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>
            <div className="py-3 relative block px-5">
              <h2 className="uppercase text-gray-700 py-2 text-lg sm:text-2xl font-medium tracking-widest">
                payment method
              </h2>
              <strong className="font-normal mr-1 capitalize">method:</strong>
              <span>{cart.paymentMethod}</span>
            </div>
            <div className="py-3 relative block px-5">
              <h2 className="uppercase text-gray-700 py-2 text-lg sm:text-2xl font-medium tracking-widest">
                order items
              </h2>
              {cart.cartItems.length === 0 ? (
                <Message
                  message={
                    <span className="text-blue-900">Your cart is empty</span>
                  }
                  closable
                />
              ) : (
                cart.cartItems.map((item) => (
                  <div
                    className="lex flex-col pl-0 mb-3 text-opacity-70 text-gray-900 text-sm sm:text-base md:text-sm lg:text-base items-center justify-center"
                    key={item.product}
                  >
                    <div className="py-3 relative block px-5 border-b">
                      <div className="-mx-3.5 flex flex-wrap items-center">
                        <div className="px-5 w-full md:w-2/12 md:flex-basis-16 relative mb-2 -ml-5 md:-ml-0 md:mb-0">
                          <img
                            src={item.image}
                            className="max-w-full h-auto align-middle flex-shrink-0 object-center shadow-sm rounded"
                            alt={item.name}
                          />
                        </div>
                        <div className="flex-grow flex-basis-0 max-w-full mb-2 md:mb-0">
                          <a
                            href="/product/5f859d671d47cbccc8e11f74"
                            className="hover:underline"
                          >
                            {item.name}
                          </a>
                        </div>
                        <div className="px-5 w-full md:w-1/3 md:flex-basis-33 relative mb-2 -ml-5 md:-ml-0 md:mb-0">
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="px-5 w-full md:w-2/5 md:flex-basis-40 relative text-sm sm:text-base md:text-sm lg:text-base break-word bg-clip-border min-w-0 flex flex-col">
          <div className="divide-y > * divide-gray-900 > * divide-opacity-20 border flex flex-col pl-0 mb-0">
            <div className="py-3 relative block px-5">
              <h2 className="uppercase text-gray-700 py-2 text-lg sm:text-2xl font-medium tracking-widest">
                order summary
              </h2>
            </div>
            <div className="py-3 relative block px-5 text-gray-700 text-opacity-80 capitalize">
              <div className="-mx-3.5 flex flex-wrap px-3">
                <div className="flex-grow flex-basis-0 max-w-full">items</div>
                <div className="flex-grow flex-basis-0 max-w-full">
                  ${cart.itemsPrice}
                </div>
              </div>
            </div>
            <div className="py-3 relative block px-5 text-gray-700 text-opacity-80 capitalize">
              <div className="-mx-3.5 flex flex-wrap px-3">
                <div className="flex-grow flex-basis-0 max-w-full">
                  shipping
                </div>
                <div className="flex-grow flex-basis-0 max-w-full">
                  ${cart.shippingPrice}
                </div>
              </div>
            </div>
            <div className="py-3 relative block px-5 text-gray-700 text-opacity-80 capitalize">
              <div className="-mx-3.5 flex flex-wrap px-3">
                <div className="flex-grow flex-basis-0 max-w-full">tax</div>
                <div className="flex-grow flex-basis-0 max-w-full">
                  ${cart.taxPrice}
                </div>
              </div>
            </div>
            <div className="py-3 relative block px-5 text-gray-700 text-opacity-80 capitalize">
              <div className="-mx-3.5 flex flex-wrap px-3">
                <div className="flex-grow flex-basis-0 max-w-full">total</div>
                <div className="flex-grow flex-basis-0 max-w-full">
                  ${cart.totalPrice}
                </div>
              </div>
            </div>
            {error && (
              <div className="">
                <Message
                  message={<span className="text-red-900">{error}</span>}
                  type="error"
                  closable
                />
              </div>
            )}
            <div className="">
              {cart.cartItems.length === 0 ? (
                <button
                  className="bg-green-900 text-gray-100 uppercase w-full p-3 inline-block text-sm disabled:opacity-50 cursor-default"
                  disabled
                >
                  place order
                </button>
              ) : (
                <button
                  className="bg-green-900 opacity-90 text-gray-100 uppercase w-full p-3 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-200 hover:opacity-100 inline-block text-sm transition-colors ease-in-out"
                  onClick={placeOrderHandler}
                >
                  place order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;