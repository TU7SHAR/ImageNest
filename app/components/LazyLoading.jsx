// components/Skeleton.js
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LazyLoading = () => {
  return (
    <div className="skeleton-container">
      <Skeleton height={30} width={`80%`} style={{ marginBottom: 10 }} />
      <Skeleton count={5} style={{ marginBottom: 10 }} />
      <Skeleton height={60} width={`95%`} />
    </div>
  );
};

export default LazyLoading;
