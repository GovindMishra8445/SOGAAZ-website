import DownloadAppDesign from "../../components/common/DownloadAppDesign";
import CalculateInsurance from "../Home/CalculateInsurance";
import FAQ from "../Home/FAQ";
import GroupSites from "../Home/GroupSites";
import PopularCard from "../Home/PopularCard";
import SlideCard from "../Home/SlideCard";
import VideoSlide from "../Home/VideoSlide";
import BusinessAllProducts from "./BusinessAllProducts";
import BusinessIndustrySolutions from "./BusinessIndustrySolutions";
import BusinessPopularCard from "./BusinessPopularCard";
import BusinessSlideCard from "./BusinessSlideCard";
import SogaazTrust from "./SogaazTrust";

const Business = () => {
  return (
    <div className="max-w-[1350px] mx-auto px-4 ">
      <BusinessSlideCard />
      <BusinessPopularCard />
      <BusinessAllProducts />
      <BusinessIndustrySolutions />
      <SogaazTrust />
    </div>
  );
};

export default Business;
