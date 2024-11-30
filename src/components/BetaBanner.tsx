type BetaBanner = {
  Text: string;
  LinkText: String;
  SecondText: String;
};

export default function BetaBanner(props: BetaBanner) {
  const { Text, LinkText, SecondText } = props;
  return (
    <div className="beta-banner">
      <div className="content-beta-banner">
        {Text}
        <a
          href="https://www.discrescuenetwork.com/bugreport"
          target="_blank"
          rel="noreferrer"
        >
          <span>{LinkText}</span>
        </a>
        {SecondText}
      </div>
    </div>
  );
}
