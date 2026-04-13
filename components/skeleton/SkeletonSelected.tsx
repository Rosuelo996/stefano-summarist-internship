import Skeleton from "./Skeleton";

function SkeletonSelected() {
  return (
    <div id="selected">
      <div className="for-you__title">Selected just for you</div>
      <Skeleton className="selected__book-skeleton" />
    </div>
  );
}

export default SkeletonSelected;