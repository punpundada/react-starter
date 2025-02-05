import notFound from "@/assets/notFoundImage.png";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { Helmet } from "react-helmet";

const NotFound = () => {
  return (
    <div className="w-full h-full flex justify-center items-center select-none">
      <Helmet>
        <title>ILMS | 404</title>
      </Helmet>
      <img src={notFound} alt="Not-found" className="scale-[.5]" />
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(900px_circle_at_center,red,transparent)]"
        )}
      />
    </div>
  );
};

export default NotFound;
