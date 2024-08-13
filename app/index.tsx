import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Index = () => {
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [pressed, setPressed] = useState(-1);
  const [size, setSize] = useState("");
  const [total, setTotal] = useState(0);
  const [toPay, setToPay] = useState(0);
  const [selectedDrink, setSelectedDrink] = useState("");
  const pizza = {
    Pepperoni: {
      Small: 300,
      Medium: 350,
      Large: 400,
    },
    Supreme: {
      Small: 350,
      Medium: 400,
      Large: 450,
    },
    Cheese: {
      Small: 200,
      Medium: 250,
      Large: 300,
    },
  };
  const drinks = {
    Soda: {
      Small: 30,
      Medium: 35,
      Large: 40,
    },
    Juice: {
      Small: 35,
      Medium: 40,
      Large: 45,
    },
  };

  const handlePress = (flavor: string, index: number) => {
    setSelectedFlavor(flavor);
    setPressed(index);
    if (pressed === index) {
      setPressed(-1);
    }
  };

  const handlePressDrinks = (flavor: string) => {
    setSelectedDrink(flavor);
    console.log(flavor);
  };

  const renderButton = (flavor: string, index: number) => (
    <TouchableOpacity
      key={index}
      onPress={() => {
        flavor !== "Soda" && flavor !== "Juice"
          ? handlePress(flavor, index)
          : handlePressDrinks(flavor);
      }}
      className={
        pressed !== index
          ? "bg-gray-200 mt-10 rounded-lg p-2 m-5 justify-center"
          : "bg-gray-600 mt-10 rounded-lg p-2 m-5 justify-center"
      }
    >
      <Text className=" text-blue-950 font-extrabold text-5xl self-center">
        {flavor}
      </Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    const updatedToPay = toPay + total;
    setToPay(updatedToPay);
    console.log("TO PAY:", updatedToPay);
  }, [total]);

  return (
    <View className="flex-1 pt-20 bg-slate-400">
      <View className="flex-row">
        <View>
          <Text className="ml-5 text-blue-950 font-extrabold text-5xl">
            Welcome
          </Text>
          <Text className="ml-5 text-blue-950 font-extrabold text-5xl">
            to <Text className="text-zinc-200 font-extrabold">Pizza</Text>
          </Text>
          <Text className="ml-5 text-blue-950 font-extrabold text-5xl">
            ordering system
          </Text>
        </View>
      </View>

      {pressed === -1 && (
        <View className="mt-10">
          {Object.keys(pizza).map((flavor, index) =>
            renderButton(flavor, index)
          )}
        </View>
      )}
      {pressed === -2 && selectedDrink === "" && (
        <>
          <View className="mt-10">
            <TouchableOpacity
              onPress={() => {
                setPressed(-1);
                setSelectedFlavor("");
                setSize("");
              }}
              className="bg-gray-950 rounded-lg p-2 m-5 justify-center"
            >
              <Text className="self-center font-extrabold text-slate-500 text-2xl">
                Change Pizza Flavor
              </Text>
            </TouchableOpacity>
            {Object.keys(drinks).map((flavor, index) =>
              renderButton(flavor, index)
            )}
          </View>
        </>
      )}

      <ScrollView className="mt-10">
        {selectedDrink === "Soda" && (
          <>
            <Sizes
              selectedFlavor={selectedDrink}
              setPressed={setPressed}
              setSelectedDrink={setSelectedDrink}
              setSelectedFlavor={setSelectedFlavor}
              setSize={setSize}
              pressed={pressed}
              size={size}
              setTotal={setTotal}
              item={drinks}
            />
            {size !== "" && <ProceedCheckOut total={total} toPay={toPay} />}
          </>
        )}
        {selectedDrink === "Juice" && (
          <>
            <Sizes
              selectedFlavor={selectedDrink}
              setPressed={setPressed}
              setSelectedDrink={setSelectedDrink}
              setSelectedFlavor={setSelectedFlavor}
              setSize={setSize}
              pressed={pressed}
              size={size}
              setTotal={setTotal}
              item={drinks}
            />
            {size !== "" && <ProceedCheckOut total={total} toPay={toPay} />}
          </>
        )}
        {selectedFlavor === "Pepperoni" && pressed !== -2 && (
          <>
            <Sizes
              setSelectedDrink={setSelectedDrink}
              selectedFlavor={selectedFlavor}
              setPressed={setPressed}
              setSelectedFlavor={setSelectedFlavor}
              setSize={setSize}
              pressed={pressed}
              size={size}
              setTotal={setTotal}
              item={pizza}
            />
          </>
        )}
        {selectedFlavor === "Supreme" && pressed !== -2 && (
          <>
            <Sizes
              setSelectedDrink={setSelectedDrink}
              selectedFlavor={selectedFlavor}
              setPressed={setPressed}
              setSelectedFlavor={setSelectedFlavor}
              setSize={setSize}
              pressed={pressed}
              size={size}
              setTotal={setTotal}
              item={pizza}
            />
          </>
        )}
        {selectedFlavor === "Cheese" && pressed !== -2 && (
          <>
            <Sizes
              setSelectedDrink={setSelectedDrink}
              selectedFlavor={selectedFlavor}
              setPressed={setPressed}
              setSelectedFlavor={setSelectedFlavor}
              setSize={setSize}
              pressed={pressed}
              size={size}
              setTotal={setTotal}
              item={pizza}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Index;

interface Item {
  [key: string]: {
    Small: number;
    Medium: number;
    Large: number;
  };
}

interface SizesProps {
  setPressed: React.Dispatch<React.SetStateAction<number>>;
  setSize: React.Dispatch<React.SetStateAction<string>>;
  setSelectedFlavor: React.Dispatch<React.SetStateAction<string>>;
  setSelectedDrink: React.Dispatch<React.SetStateAction<string>>;
  pressed: number;
  size: string;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  item: Item;
  selectedFlavor: string;
}

const Sizes: React.FC<SizesProps> = ({
  selectedFlavor,
  setPressed,
  setSize,
  setSelectedDrink,
  setSelectedFlavor,
  pressed,
  size,
  setTotal,
  item,
}) => {
  return (
    <>
      <TouchableOpacity
        key={pressed}
        onPress={() => {
          if (selectedFlavor === "Juice" || selectedFlavor === "Soda") {
            setPressed(-2);
            setSelectedDrink("");
            setSize("");
          } else {
            setPressed(-1);
            setSelectedFlavor("");
            setSize("");
          }
        }}
        className="bg-gray-600 mt-10 rounded-lg p-2 m-5 justify-center"
      >
        <Text className="text-slate-300 font-extrabold text-5xl self-center">
          {selectedFlavor}
        </Text>
      </TouchableOpacity>
      <View className="flex-row gap-5 justify-center">
        <TouchableOpacity
          onPress={() => {
            if (size !== "" && size === "Small") {
              setSize("");
            } else {
              setSize("Small");
              setTotal(item[selectedFlavor].Small);
            }
          }}
          className={
            size === "Small"
              ? "justify-center bg-white rounded-full p-2"
              : "justify-center"
          }
        >
          {selectedFlavor === "Juice" || selectedFlavor === "Soda" ? (
            <MaterialCommunityIcons
              name="glass-tulip"
              size={70}
              color="#0f172a"
            />
          ) : (
            <Ionicons name="pizza-outline" size={70} color="#0f172a" />
          )}
          <Text className="self-center font-extrabold text-slate-900 text-xl">
            ₱{item[selectedFlavor].Small}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (size !== "" && size === "Medium") {
              setSize("");
            } else {
              setSize("Medium");
              setTotal(item[selectedFlavor].Medium);
            }
          }}
          className={
            size === "Medium"
              ? "justify-center bg-white rounded-full p-2"
              : "justify-center"
          }
        >
          {selectedFlavor === "Juice" || selectedFlavor === "Soda" ? (
            <MaterialCommunityIcons
              name="glass-tulip"
              size={90}
              color="#0f172a"
            />
          ) : (
            <Ionicons name="pizza-outline" size={90} color="#0f172a" />
          )}
          <Text className="self-center font-extrabold text-slate-900 text-xl">
            ₱{item[selectedFlavor].Medium}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (size !== "" && size === "Large") {
              setSize("");
            } else {
              setSize("Large");
              setTotal(item[selectedFlavor].Large);
            }
          }}
          className={
            size === "Large"
              ? "justify-center bg-white rounded-full p-2"
              : "justify-center"
          }
        >
          {selectedFlavor === "Juice" || selectedFlavor === "Soda" ? (
            <MaterialCommunityIcons
              name="glass-tulip"
              size={110}
              color="#0f172a"
            />
          ) : (
            <Ionicons name="pizza-outline" size={110} color="#0f172a" />
          )}
          <Text className="self-center font-extrabold text-slate-900 text-xl">
            ₱{item[selectedFlavor].Large}
          </Text>
        </TouchableOpacity>
      </View>
      {size !== "" &&
        selectedFlavor !== "Juice" &&
        selectedFlavor !== "Soda" && (
          <TouchableOpacity
            onPress={() => {
              setPressed(-2);
              setSize("");
            }}
            className="bg-slate-500 mt-10 rounded-lg p-2 m-5 justify-center"
          >
            <Text className="text-slate-100 font-extrabold text-2xl self-center">
              Proceed to Drinks
            </Text>
          </TouchableOpacity>
        )}
    </>
  );
};

interface CheckOut {
  total: number;
  toPay: number;
}

const ProceedCheckOut: React.FC<CheckOut> = ({ toPay }) => {
  const [checkout, setCheckout] = useState(false)
  return (<>
    {!checkout ? <TouchableOpacity
      onPress={() => {
        console.log(toPay);
        setCheckout(true)
      }}
      className="bg-slate-500 mt-10 rounded-lg p-2 m-5 justify-center"
    >
      <Text className="text-slate-100 font-extrabold text-2xl self-center">
        Proceed to Check Out
      </Text>
    </TouchableOpacity> : <View>
      <Text className="text-slate-900 font-extrabold text-3xl self-center mt-10">Your total to pay is: {toPay}</Text>
      <Text className="text-slate-100 font-extrabold text-5xl self-center mt-10">Thank you!</Text>
      </View>}
    </>
  );
};
