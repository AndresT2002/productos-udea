import { Stripe } from "stripe";
import ButtonCheckout from "../components/ButtonCheckout";
import Image from "next/image";

async function loadPrices() {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const pricesData = await stripe.prices.list();

  const pricesWithProductNames = await Promise.all(
    pricesData.data.map(async (price) => {
      const product = await stripe.products.retrieve(price.product);
      return {
        id: price.id,
        unit_amount: price.unit_amount,
        currency: price.currency,
        productName: product.name,
        image: product.images[0],
      };
    })
  );
  return pricesWithProductNames;
}

async function PricingPage() {
  const productos = await loadPrices();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
            Elige el producto perfecto
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            Precios en dólares americanos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={producto.image}
                  alt={producto.productName}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              <div className="p-8 relative">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {producto.productName}
                  </h3>

                  <div className="flex justify-center items-baseline mb-8 bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-2xl">
                    <span className="text-6xl font-extrabold text-gray-900">
                      {(producto.unit_amount / 100).toFixed(2)}
                    </span>
                    <span className="text-xl font-medium text-gray-700 ml-2">
                      {producto.currency.toUpperCase()}
                    </span>
                  </div>

                  <ButtonCheckout
                    priceId={producto.id}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
