import "../styles/forms.css"

var stateTuples = [
    ["All", "All"],
    ["Alabama", "AL"],
    ["Alaska", "AK"],
    ["Arizona", "AZ"],
    ["Arkansas", "AR"],
    ["California", "CA"],
    ["Colorado", "CO"],
    ["Connecticut", "CT"],
    ["Delaware", "DE"],
    ["Florida", "FL"],
    ["Georgia", "GA"],
    ["Hawaii", "HI"],
    ["Idaho", "ID"],
    ["Illinois", "IL"],
    ["Indiana", "IN"],
    ["Iowa", "IA"],
    ["Kansas", "KS"],
    ["Kentucky", "KY"],
    ["Louisiana", "LA"],
    ["Maine", "ME"],
    ["Maryland", "MD"],
    ["Massachusetts", "MA"],
    ["Michigan", "MI"],
    ["Minnesota", "MN"],
    ["Mississippi", "MS"],
    ["Missouri", "MO"],
    ["Montana", "MT"],
    ["Nebraska", "NE"],
    ["Nevada", "NV"],
    ["New Hampshire", "NH"],
    ["New Jersey", "NJ"],
    ["New Mexico", "NM"],
    ["New York", "NY"],
    ["North Carolina", "NC"],
    ["North Dakota", "ND"],
    ["Ohio", "OH"],
    ["Oklahoma", "OK"],
    ["Oregon", "OR"],
    ["Pennsylvania", "PA"],
    ["Rhode Island", "RI"],
    ["South Carolina", "SC"],
    ["South Dakota", "SD"],
    ["Tennessee", "TN"],
    ["Texas", "TX"],
    ["Utah", "UT"],
    ["Vermont", "VT"],
    ["Virginia", "VA"],
    ["Washington", "WA"],
    ["West Virginia", "WV"],
    ["Wisconsin", "WI"],
    ["Wyoming", "WY"],
];

var courses = [
    { name: "Course Not Listed", city: "NA", state: "NA" },
    { name: "Maple Hill", city: "Leicester", state: "Massachusetts" },
    { name: "Tranquility Trails", city: "Woolwich", state: "New Jersey" },
    { name: "Blue Ribbon Pines", city: "East Bethel", state: "Minnesota" },
    { name: "Flip City", city: "Shelby", state: "Michigan" },
    { name: "Fox Run Meadows", city: "Smugglers' Notch", state: "Vermont" },
    { name: "Idlewild", city: "Burlington", state: "Kentucky" },
    { name: "The Beast", city: "Waco", state: "Texas" },
    { name: "DeLaveaga", city: "Santa Cruz", state: "California" },
    { name: "Hornets Nest", city: "Charlotte", state: "North Carolina" },
    { name: "Fountain Hills", city: "Fountain Hills", state: "Arizona" },
    { name: "Rollin Ridge", city: "Reedsville", state: "Wisconsin" },
    {
      name: "S.Y. Wilson Arlington Sports Complex",
      city: "Arlington",
      state: "Tennessee",
    },
    { name: "10-3 at CB", city: "Mt. Crested Butte", state: "Colorado" },
    {
      name: "1000 Acres Ranch Disc Golf Course",
      city: "Stony Creek",
      state: "New York",
    },
    {
      name: "2022 Lucky Disc Golf Open Freeman North",
      city: "Idaho Falls",
      state: "Idaho",
    },
    { name: "3 Creeks", city: "Rising Sun", state: "Maryland" },
    { name: "50 Acre Park", city: "Evergreen", state: "Illinois" },
    { name: "501 Disc Golf", city: "Warren", state: "Massachusetts" },
    {
      name: "65th Infantry Veterans Disc Golf Course",
      city: "Kissimmee",
      state: "Florida",
    },
    { name: "A. J. Jolly Park", city: "Alexandria", state: "Kentucky" },
    { name: "Stafford Woods", city: "Voorhees", state: "New Jersey" },
    { name: "Bellevue State Park", city: "Bellevue", state: "Delaware" },
    {
      name: "Inverness Disc Golf Park",
      city: "Inverness",
      state: "Florida",
    },
    {
      name: "Girdwood Forest Fair Park",
      city: "Girdwood",
      state: "Alaska",
    },
    {
      name: "Windy Ridge Disc Golf at Mitchusson Park",
      city: "Huntsville",
      state: "Arkansas",
    },
    { name: "North Landing", city: "Virginia Beach", state: "Virginia" },
  ];

  interface FormProps {
    inicialOption: string;
    courseOption: string; 
  }

const Form = (props: FormProps) => {
    const { inicialOption, courseOption } =  props; 
    return (
        <>
            <div className="mt-5 mb-3 select-box">
            <div className="col-4 pe-0 arrow one">
            <select className="form-select">
                        <option value="All">{inicialOption}</option>
                        {stateTuples.map((state, index) => (
                            <option key={index} value={state[1]}>{state[0]}</option>
                        ))}
                    </select>
            </div>
            <div className="col-8 pe-0 arrow">
                <select className="form-select">
                     <option value="NA">{courseOption}</option>
                        {courses.map((course, index) => (
                        <option key={index} value={course.name}>{course.name}</option>
                    ))}
                </select>
            </div>
        </div>
        </>
    )
}

export default Form;