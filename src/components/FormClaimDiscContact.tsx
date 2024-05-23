import "../styles/claimDiscComponents.css"

var stateTuples = [
    ["Johns Simple Store Pickup (Wednesday)"],
    ["Johns Simple Store Pickup (Thursday)"],
    ["Johns Simple Store Pickup (Friday)"],
    ["Johns Simple Store Pickup (Saturday)"],
    ["Johns Simple Store Pickup (Sunday)"],
    ["Johns Simple Store Pickup (Monday)"],
    ["Johns Simple Store Pickup (Tuesday"],
]

interface FormReportLostColorProps {
    contactMethod: 'phone' | 'email';
    initialName: string;
}

const FormClaimDiscContact = (props: FormReportLostColorProps) => {
    const { contactMethod , initialName } = props
    const placeholder = contactMethod === 'email' ? 'Email Address' : 'Phone Number Written on The Disc' ;
    return (
        <>
            <div className="select-box-claim">
            <div className="col-10 claim-disc-form" style={{padding: '0'}}>
            <input placeholder={placeholder} type={contactMethod === 'email' ? 'email' : 'text'} />
            </div>
            <div className="col-10 pe-0 arrow one">
            <select className="form-select-claim">
                    <option value="All">{initialName}</option>
                      {stateTuples.map((state, index) => (
                        <option key={index} value={state[1]}>{state[0]}</option>
                        ))}
                    </select>
            </div>
        </div>
        </>
    )
}

export default FormClaimDiscContact;