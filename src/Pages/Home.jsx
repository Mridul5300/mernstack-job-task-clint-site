import Task from "./Tasklist/Task";

const Home = () => {
  return (
    <div
      className="
        max-w-full 
        mx-auto 
        px-4 sm:px-6 lg:px-8 
        py-4 
        relative 
        z-20

        -mt-[325px]        /* small screens: 64px */
        md:-mt-[325px]    /* medium screens: 96px */
        lg:-mt-[325px]     /* large screens: 160px */
        xl:-mt-[325px]     /* extra large: 192px */
      "
    >
      <Task />
    </div>
  );
};

export default Home;
