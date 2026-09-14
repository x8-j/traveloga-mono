import EachOfferSelection from './EachOfferSelection';
import { useDestinationQuery } from '../../query/destination';

const OfferSelection = () => {
  const { data = [], isPending } = useDestinationQuery({
    paramsFilter: {
      limitedOffers: 'true',
    },
  });

  return (
    <section className="flex flex-col justify-center gap-4 md:gap-6 lg:gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-center text-lg lg:text-left lg:text-xl">OFFERS</h1>
        <div className="hidden h-[2px] bg-black sm:block " />
      </div>
      <div className="flex w-full flex-col items-center gap-8 lg:gap-12">
        <EachOfferSelection data={data} loading={isPending} />
      </div>
    </section>
  );
};
export default OfferSelection;
