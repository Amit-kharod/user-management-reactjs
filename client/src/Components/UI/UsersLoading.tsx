import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const UsersLoading = () => {
  return (
    <>
      {Array(3)
        .fill(0)
        .map((_, i) => {
          return (
            <div className="col-span-12 w-full h-40 lg:col-span-6 sm:h-52 2xl:col-span-4" key={i}>
              <Skeleton width="100%" height="100%" />
            </div>
          );
        })}
    </>
  );
};
