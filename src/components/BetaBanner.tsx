type BetaBanner = {
    Course: string;
  };

export default function BetaBanner(props: BetaBanner) {
    const { Course } = props;
    return(
        <div className="beta-banner">
            <div className="content-beta-banner">{Course}</div>
        </div>
    )
}