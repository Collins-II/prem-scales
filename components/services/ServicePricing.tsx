import { ServiceTier } from "@/data/dummy";

export default function ServicePricing({ tiers }: { tiers: ServiceTier[] }) {
  return (
    <section>
      <span className="inline-block mb-2 text-sm font-medium uppercase tracking-wide text-red-600">Service Pricing</span>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-800">
        {tiers.map((tier, i) => (
          <div
            key={i}
            className={`rounded-2xl border p-6 ${
              tier.recommended
                ? "border-red-600 shadow-lg"
                : "border-none"
            }`}
          >
            <h3 className="text-lg font-semibold">{tier.name}</h3>
            <p className="text-2xl font-bold mt-2">{tier.price}</p>

            <ul className="mt-4 space-y-2 text-sm">
              {tier.features.map((f, idx) => (
                <li key={idx}>✔ {f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
