import "../styles/storeComponents.css";
import Button from "./Button";
import FormStore from "./FormStore";

interface StoreComponents {
  baseText: string;
  contentText: string;
  smallText: string;
}

const StoreComponents: React.FC<StoreComponents> = ({
  baseText,
  contentText,
  smallText,
}) => {
  return <div className="components-store">phone opt in</div>;
};

export default StoreComponents;
