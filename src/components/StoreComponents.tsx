import "../styles/storeComponents.css"
import Button from "./Button";
import FormStore from "./FormStore";

interface StoreComponents {
    baseText: string; 
    contentText: string;
    smallText: string;

}

const StoreComponents: React.FC<StoreComponents> = ({ baseText, contentText, smallText }) => {
    const indexOf20PercentOff = smallText.indexOf("20% off");
    const before20PercentOff = smallText.substring(0, indexOf20PercentOff);
    const after20PercentOff = smallText.substring(indexOf20PercentOff + "20% off".length);

    return (
        <div className="components-store">
            <h2 className="header-store">{baseText}</h2>
            <h4 className="subheader-store">
                {contentText} <br /> <br />
                <span className="subheader-small">{before20PercentOff}<u>20% off</u>{after20PercentOff}</span>
            </h4>
            <div className="buttons-store">
            <FormStore inputName={"PHONE NUMBER OR EMAIL FOR NOTIFICATION"} />
            <Button
                text={"Get notified when the deals are live"}
                red={true}
                border={true}
                className="button-red-store"
                onClick={() => {
                  alert("button clicked");
                }}
              />
            </div>
        </div>
    )
};

export default StoreComponents; 