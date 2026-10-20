import { hero } from '../content/site';

type Props = { leadClass: string; mainClass: string };

// The headline's inner arrangement, shared by the hero and the pinned identity so the two
// cannot drift: the lead small in ash, then the claim larger with its first word italic.
// The caller supplies the wrapping element, the colour and the two sizes.
export default function Headline({ leadClass, mainClass }: Props) {
  return (
    <>
      <span className={`mr-[0.35em] font-normal text-ash ${leadClass}`}>{hero.lead}</span>
      <span className={`font-semibold tracking-[-0.01em] ${mainClass}`}>
        <em className="italic">{hero.emphasis}</em> {hero.rest}
      </span>
    </>
  );
}
