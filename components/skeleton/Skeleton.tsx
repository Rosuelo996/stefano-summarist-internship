type Props = {
  className?: string;
};

function Skeleton({ className = "" }: Props) {
  return <div className={`skeleton ${className}`}></div>;
}

export default Skeleton;