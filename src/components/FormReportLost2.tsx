import { useState, useEffect } from "react";
import { Disc } from "../App";
import { useInventoryContext } from "../hooks/useInventory";

interface FormReportLostColorProps {
  color: string;
  number: string;
  contactMethod: "phone" | "email";
  onContactValueChange: (value: string) => void;
  onColorChange: (value: string) => void;
}

const FormReportLost2 = (props: FormReportLostColorProps) => {
  const { color, number, contactMethod, onContactValueChange, onColorChange } =
    props;
  const placeholder = contactMethod === "email" ? "Email Address" : number;
  const [contactValue, setContactValue] = useState("");

  const { inventory, loading } = useInventoryContext();
  const [colors, setColors] = useState<string[]>([]);

  // useEffect(() => {
  //   fetchInventory();
  // }, []);

  useEffect(() => {
    //console.log('Inventory:', inventory);
    if (inventory && inventory.length > 0) {
      const uniqueColors = Array.from(
        new Set(inventory.map((disc: Disc) => disc.color))
      );
      setColors(
        uniqueColors.filter((color): color is string => Boolean(color))
      );
    }
  }, [inventory]);

  const handleContactChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if (contactMethod === "phone") {
      value = formatPhoneNumber(value);
    }
    setContactValue(value);
    onContactValueChange(value);
  };

  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  };

  return (
    <div className="select-box-report">
      <div className="col-4 pe-0">
        <input
          className="form-select-report"
          placeholder="Color"
          onChange={(e) => onColorChange(e.target.value)}
          list="colors"
        />
        <datalist id="colors">
          {colors.map((color, index) => (
            <option key={index} value={color} />
          ))}
        </datalist>
      </div>
      <div className="col-8 report-lost">
        <input
          placeholder={placeholder}
          type={contactMethod === "email" ? "email" : "text"}
          value={contactValue}
          onChange={handleContactChange}
        />
      </div>
    </div>
  );
};

export default FormReportLost2;
