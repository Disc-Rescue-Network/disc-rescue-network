type BetaBanner = {
  Text: string;
};

export default function BetaBanner(props: BetaBanner) {
  const { Text } = props;
  return (
    <div className="beta-banner">
      <div className="content-beta-banner">{Text}</div>
    </div>
  );
}
