import { useEffect } from "react";
import { useInventory } from "../hooks/useInventory";
import "../styles/formStep4.css";

interface FormStep4Props {
  inputBrand: string;
  brand: string;
  setBrand: (value: string) => void;
}

const FormStep4 = (props: FormStep4Props) => {
  const { inputBrand, brand, setBrand } = props;
  const { inventory, fetchInventory } = useInventory();

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBrand(e.target.value);
  };
  const handleBrandInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.value", e.target.value);
    setBrand(e.target.value);
  };

  useEffect(() => {
    if (inventory.length === 0) {
      console.log("Fetching inventory");
      fetchInventory();
    }
  }, [inventory]);

  const brands = Array.from(new Set(inventory.map((disc) => disc.brand).filter(brand => brand && brand.trim() !== ""))).sort((a, b) => a!.localeCompare(b!));
  console.log("brands", brands);

  return (
    <div className="input-dropdown-wrapper mt-1">
      <input
        placeholder={inputBrand}
        value={brand}
        onChange={handleBrandInputChange}
      />
      <div className="circle-or">OR</div>
          <select
        className="select-brand-dropdown"
        value={brand}
        onChange={handleBrandChange}
      >
        <option value="">Select Brand</option>
                        {
                  Array.from(new Set(inventory.map((disc) => disc.brand).filter(brand => brand && brand.trim() !== "")))
                    .sort((a, b) => a!.localeCompare(b!)) // Add this line to sort alphabetically
                    .map((brand) => (
                      <option key={brand} value={brand!}>
                        {brand}
                      </option>
                    ))
                }
      </select>
    </div>
  );
};

export default FormStep4;
