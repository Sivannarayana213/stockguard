import { useEffect, useState } from "react";
import api from "../api/api";

export default function InventoryTable() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/api/products")
      .then((res) => {
        setProducts(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Failed to fetch products", err);
        setProducts([]);
      });
  }, []);

  return (
    <div className="rounded-lg sm:rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-6 w-full">
      <h2 className="text-base sm:text-lg font-semibold mb-4">
        Inventory & Stock Levels
      </h2>

      <div className="overflow-x-auto -mx-4 sm:mx-0 sm:rounded-lg">
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-white/10">
              <th className="py-3 px-4 sm:px-0 text-left whitespace-nowrap">Product</th>
              <th className="py-3 px-4 sm:px-0 text-center whitespace-nowrap">SKU</th>
              <th className="py-3 px-4 sm:px-0 text-center whitespace-nowrap">Stock</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                <td className="py-3 px-4 sm:px-0">{p.name}</td>
                <td className="py-3 px-4 sm:px-0 text-center font-mono">{p.sku}</td>
                <td className="py-3 px-4 sm:px-0 text-center font-bold">{p.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
