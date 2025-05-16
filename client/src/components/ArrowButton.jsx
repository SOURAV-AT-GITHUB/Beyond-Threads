import rightArrowWhite from "/Images/right-arrow-white.svg";
import rightArrowBlack from "/Images/right-arrow-black.svg";
import CircularProgress from "@mui/material/CircularProgress";
export default function ArrowButton({
  style = 1,
  text = "Default",
  isLoading = false,
}) {
  return (
    <div
      className={`flex items-center h-[50px] w-auto group/arrow-button border ${
        style === 1 ? "border-white" : "border-primary"
      }`}
    >
      <div
        className={`${
          style === 1 ? "bg-white text-black" : "bg-primary text-white"
        } text-black px-4 h-full w-full flex items-center`}
      >
        {isLoading ? <CircularProgress color="" sx={{margin:"auto"}}/> : <p>{text}</p>}
      </div>
      <div className=" w-[50px] overflow-hidden h-full ">
        <div className="w-[200%] flex -translate-x-2/4 group-hover/arrow-button:-translate-x-0 transition-transform ease-in-out duration-300">
          <div
            className={`px-2 w-full min-h-[50px] ${
              style === 1
                ? "transparent-white-bg"
                : style === 2
                ? "bg-[#363338]"
                : "bg-white"
            }`}
          >
            <img
              src={style === 2 ? rightArrowWhite : rightArrowBlack}
              alt=""
              className="w-full h-full "
            />
          </div>
          <div className="px-2 w-full min-h-[50px]">
            <img
              src={style === 2 ? rightArrowBlack : rightArrowWhite}
              alt=""
              className="w-full h-full "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
