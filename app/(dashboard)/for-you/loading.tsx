import SkeletonBookSection from "../../../components/skeleton/SkeletonBookSection";
import SkeletonSelected from "../../../components/skeleton/SkeletonSelected";

export default function Loading() {
  return (
    <div className="row">
      <div className="container">
        <div className="for-you__wrapper">
          <SkeletonSelected />
          <SkeletonBookSection
            title="Recommended For You"
            subTitle="We think you’ll like these"
          />

          <SkeletonBookSection
            title="Suggested Books"
            subTitle="Browse those books"
          />
          
        </div>
      </div>
    </div>
  );
}