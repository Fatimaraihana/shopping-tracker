import { useEffect, useState } from "react";
import {
  Trash2,
  ShoppingCart,
  CheckCircle,
  AlertTriangle,
  Search,
} from "lucide-react";
import {
  db,
  ref,
  push,
  onValue,
  remove,
  update,
} from "./firebase";

export default function App() {
  const [items, setItems] = useState([]);
  const [product, setProduct] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
useEffect(() => {
  const itemsRef = ref(db, "shoppingitems");

  onValue(itemsRef, (snapshot) => {
    const data = snapshot.val();

    if (data) {
      const loadedItems = Object.keys(data).map(
        (key) => ({
          id: key,
          ...data[key],
        })
      );

      setItems(loadedItems.reverse());
    } else {
      setItems([]);
    }
  });
}, []);
  const addItem = async () => {
  if (!product.trim()) return;

  const itemsRef = ref(db, "shoppingitems");

  await push(itemsRef, {
    name: product,
    quantity: 1,
    priority,
    bought: false,
  });

  setProduct("");
};
 const toggleBought = async (id, current) => {
  await update(
    ref(db, `shoppingitems/${id}`),
    {
      bought: !current,
    }
  );
};
 const deleteItem = async (id) => {
  await remove(
    ref(db, `shoppingitems/${id}`)
  );
};
  const increaseQty = async (id, qty) => {
  await update(
    ref(db, `shoppingitems/${id}`),
    {
      quantity: qty + 1,
    }
  );
};

 const decreaseQty = async (id, qty) => {
  if (qty <= 1) return;

  await update(
    ref(db, `shoppingitems/${id}`),
    {
      quantity: qty - 1,
    }
  );
};

  const boughtCount = items.filter((item) => item.bought).length;
  const pendingCount = items.length - boughtCount;

  // FILTER LOGIC
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "pending") {
      return !item.bought && matchesSearch;
    }

    if (filter === "bought") {
      return item.bought && matchesSearch;
    }

    return matchesSearch;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-600";

      case "Medium":
        return "bg-yellow-100 text-yellow-700";

      case "Low":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">

      {/* SIDEBAR */}
      <div className="w-full md:w-64 bg-white shadow-xl p-6">

        <h1 className="text-3xl font-bold mb-10">
          Shopping Tracker
        </h1>

        <div className="space-y-3">

          {/* ALL ITEMS */}
          <button
            onClick={() => setFilter("all")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              filter === "all"
                ? "bg-slate-200 font-semibold"
                : "hover:bg-slate-100"
            }`}
          >
            <ShoppingCart size={20} />
            All Items
          </button>

          {/* PENDING */}
          <button
            onClick={() => setFilter("pending")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              filter === "pending"
                ? "bg-yellow-100 font-semibold"
                : "hover:bg-slate-100"
            }`}
          >
            <AlertTriangle size={20} />
            Pending
          </button>

          {/* BOUGHT */}
          <button
            onClick={() => setFilter("bought")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              filter === "bought"
                ? "bg-green-100 font-semibold"
                : "hover:bg-slate-100"
            }`}
          >
            <CheckCircle size={20} />
            Bought
          </button>

        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4 md:p-6">

        {/* TOP SECTION */}
        <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">

          <div>
            <h2 className="text-4xl font-bold">
              Dashboard
            </h2>

            <p className="text-gray-500 mt-1">
              Manage your shopping items easily
            </p>
          </div>

          {/* SEARCH */}
          <div className="flex items-center bg-white px-4 rounded-2xl shadow w-full lg:w-80">

            <Search size={18} className="text-gray-400" />

            <input
              type="text"
              placeholder="Search..."
              className="outline-none p-3 w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          <div className="bg-white rounded-2xl p-5 shadow">
            <p className="text-gray-500">Total Items</p>

            <h3 className="text-4xl font-bold mt-2">
              {items.length}
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow">
            <p className="text-gray-500">Pending</p>

            <h3 className="text-4xl font-bold mt-2">
              {pendingCount}
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow">
            <p className="text-gray-500">Bought</p>

            <h3 className="text-4xl font-bold mt-2">
              {boughtCount}
            </h3>
          </div>

        </div>

        {/* ADD ITEM */}
        <div className="bg-white rounded-2xl shadow p-5 mb-6">

          <div className="flex flex-col md:flex-row gap-3">

            <input
              type="text"
              placeholder="Enter product name..."
              className="border p-3 rounded-xl flex-1"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />

            <select
              className="border p-3 rounded-xl"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <button
              onClick={addItem}
              className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800"
            >
              Add Item
            </button>

          </div>

        </div>

       {/* ITEM LIST */}
<div className="space-y-4">

  {filteredItems.map((item) => (

    <div
      key={item.id}
      className="bg-white rounded-2xl shadow-md p-5"
    >

      {/* TOP */}
      <div className="flex justify-between items-start gap-4">

        {/* LEFT */}
        <div className="flex items-start gap-3">

          <input
            type="checkbox"
            checked={item.bought}
            onChange={() =>
              toggleBought(item.id, item.bought)
            }
            className="w-5 h-5 mt-1"
          />

          <div>

            <h2
              className={`text-lg md:text-xl font-semibold ${
                item.bought
                  ? "line-through text-gray-400"
                  : "text-gray-800"
              }`}
            >
              🛒 {item.name}
            </h2>

            {/* TAGS */}
            <div className="flex flex-wrap gap-2 mt-3">

              <span
                className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(
                  item.priority
                )}`}
              >
                {item.priority}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  item.bought
                    ? "bg-green-100 text-green-700"
                    : "bg-purple-100 text-purple-700"
                }`}
              >
                {item.bought ? "Bought" : "Pending"}
              </span>

            </div>

          </div>

        </div>

        {/* DELETE */}
        <button
          onClick={() => deleteItem(item.id)}
          className="bg-red-100 p-3 rounded-xl text-red-600 hover:bg-red-200 transition"
        >
          <Trash2 size={18} />
        </button>

      </div>

      {/* QUANTITY */}
      <div className="flex items-center justify-between mt-6">

        <p className="text-gray-600 font-medium">
          Quantity
        </p>

        <div className="flex items-center gap-3">

          <button
            onClick={() =>
              decreaseQty(item.id, item.quantity)
            }
            className="bg-slate-200 w-9 h-9 rounded-lg text-lg hover:bg-slate-300"
          >
            -
          </button>

          <span className="font-bold text-lg">
            {item.quantity}
          </span>

          <button
            onClick={() =>
              increaseQty(item.id, item.quantity)
            }
            className="bg-slate-200 w-9 h-9 rounded-lg text-lg hover:bg-slate-300"
          >
            +
          </button>

        </div>

      </div>

    </div>

  ))}

</div>

      </div>
    </div>
  );
}