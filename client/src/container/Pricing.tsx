import { PricingCard } from "../../components/PricingCard";

const Pricing = () => {
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            Pricing
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical.
          </p>
          {/* <div className="flex mx-auto border-2 border-indigo-500 rounded overflow-hidden mt-6">
            <button
              className="py-1 px-4 bg-indigo-500 text-white focus:outline-none"
              onClick={() => handlePlanToggle("monthly")}
            >
              Monthly
            </button>
            <button
              className="py-1 px-4 focus:outline-none"
              onClick={() => handlePlanToggle("annually")}
            >
              Annually
            </button>
          </div> */}
        </div>
        <div className="flex flex-wrap -m-5">
          <PricingCard
            title="START"
            price="Free"
            features={[
              "Vexillologist pitchfork",
              "Tumeric plaid portland",
              "Mixtape chillwave tumeric",
            ]}
          />
          <PricingCard
            title="PRO"
            price="$38"
            features={[
              "Vexillologist pitchfork",
              "Tumeric plaid portland",
              "Hexagon neutra unicorn",
              "Mixtape chillwave tumeric",
            ]}
            popular
          />
          <PricingCard
            title="BUSINESS"
            price="$56"
            features={[
              "Vexillologist pitchfork",
              "Tumeric plaid portland",
              "Hexagon neutra unicorn",
              "Vexillologist pitchfork",
              "Mixtape chillwave tumeric",
            ]}
          />
          <PricingCard
            title="SPECIAL"
            price="$72"
            features={[
              "Vexillologist pitchfork",
              "Tumeric plaid portland",
              "Hexagon neutra unicorn",
              "Vexillologist pitchfork",
              "Mixtape chillwave tumeric",
            ]}
          />
        </div>
      </div>
    </section>
  );
};





export default Pricing;
