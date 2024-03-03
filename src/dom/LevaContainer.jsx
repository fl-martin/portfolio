import { Leva } from "leva";
import useAppStore from "../store";

const LevaContainer = () => {
  const isMobile = useAppStore(state => state.isMobile);

  return (
    <div className='absolute top-10 md:top-14 right-1'>
      <Leva fill oneLineLabels={isMobile ? true : false} />
    </div>
  );
};

export default LevaContainer;
