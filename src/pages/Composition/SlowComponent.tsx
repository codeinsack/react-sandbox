import { fibonacci } from "../../helpers/fibonacci";

const SlowComponent = () => {
  console.log("[SlowComponent] rerender");

  fibonacci(40);

  return <h2>Slow Component</h2>;
};

export default SlowComponent;
