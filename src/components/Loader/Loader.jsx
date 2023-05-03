import { ThreeCircles } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <ThreeCircles
      height="300"
      width="100%"
      color="#3f51b5"
      wrapperStyle={{
        position: 'fixed',
        left: '50%',
        bottom: '35%',
      }}
      wrapperClass=""
      visible={true}
      ariaLabel="three-circles-rotating"
      outerCircleColor=""
      innerCircleColor="#FFFF00"
      middleCircleColor=""
    />
  );
};
