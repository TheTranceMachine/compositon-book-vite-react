import { forwardRef } from "react";

const ImageGenerator = forwardRef(({ input }, ref) => {
  console.log(input);
  return (
    <div className="imageGenerator" ref={ref}>
      Image Generator needs to be built
    </div>
  );
});

export { ImageGenerator };
