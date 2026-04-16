import DownloadAppDesign from "../../components/common/DownloadAppDesign";
import CalculateInsurance from "../Home/CalculateInsurance";
import FAQ from "../Home/FAQ";
import GroupSites from "../Home/GroupSites";
import PopularCard from "../Home/PopularCard";
import SlideCard from "../Home/SlideCard";
import VideoSlide from "../Home/VideoSlide";

const PrivateClients = () => {
  return (
    <div className="max-w-[1350px] mx-auto px-4 ">
      <SlideCard />
      <PopularCard />
      <CalculateInsurance />
      <DownloadAppDesign/>
      <FAQ />
      <GroupSites />
    </div>
  );
};

export default PrivateClients;
