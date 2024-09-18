import ProductList from "../components/ProductList";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center text-forest-green mb-8">
        "Because practical is so last season"
      </h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/4 md:pr-8">
          <ProductList />
        </div>
        <div className="md:w-1/4 mt-8 md:mt-0">
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default Home;