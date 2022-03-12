import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, decItemQuanitybyOne, removeFromBasket } from "../slices/basketSlice";

function CheckoutProduct({
  id,
  title,
  price,
  rating,
  hasPrime,
  description,
  category,
  image,
  count,
}) {
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      hasPrime,
      rating,
    };

    //push to global store
    dispatch(addToBasket(product));
  };

  const removeItemToBasket = () => {
    //remove item from redux store
    dispatch(removeFromBasket({ id }));
  };

  const decItemQuanity = () => {
    //check for count if !1 remove item
    if (count == 1) {
      removeItemToBasket();
      return true;
    }

    //decrement the count by one if count>1
    dispatch(decItemQuanitybyOne({ id }));
  };

  return (
    <div className="grid grid-cols-5">
      <Image src={image} height={200} width={200} objectFit="contain" />

      {/*middle section */}
      <div className="col-span-3 mx-5">
        <p>{title}</p>

        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon className="h-5 text-yellow-500" />
            ))}
        </div>

        <p className="text-xs my-2 line-clamp-3">{description}</p>

        <div className="whitespace-nowrap text-sm">
          {count > 1 && (
            <span>
              {count} x <Currency quantity={price} currency="USD" /> ={" "}
            </span>
          )}
          <span className="font-semibold">
            <Currency quantity={price * count} currency="USD" />
          </span>
        </div>

        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              loading="lazy"
              className="w-12"
              src="https://links.papareact.com/fdw"
            />
            <p className="text-xs text-gray-500">Free Next-day Delivery</p>
          </div>
        )}
      </div>

      {/*right section -> add, remove btn*/}
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        {/*<button onClick={addItemToBasket} className="button">
          Add to Basket
        </button>*/}
        <div className="flex items-center flex-grow">
          <button
            onClick={decItemQuanity}
            className="buttonIncDec w-1/5 sm:w-3/10"
          >
            -
          </button>
          <span className="text-sm font-semibold grid justify-items-center ml-1 mr-1 w-3/5 sm:w-3/10">
            Quantity: {count}
          </span>
          <button
            onClick={addItemToBasket}
            className="buttonIncDec w-1/5 sm:w-3/10"
          >
            +
          </button>
        </div>
        <button onClick={removeItemToBasket} className="button">
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
