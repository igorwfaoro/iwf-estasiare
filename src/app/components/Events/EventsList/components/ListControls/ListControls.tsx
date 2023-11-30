import {
  ChevronLeftSVGIcon as IconArrowLeft,
  ChevronRightSVGIcon as IconArrowRight
} from '@react-md/material-icons';

interface ListControlsProps {
  controlButtonWidth: number;
  showArrowLeft: boolean;
  showArrowRight: boolean;
  handleClickButtonLeft: () => void;
  handleClickButtonRight: () => void;
}

export default function ListControls({
  controlButtonWidth,
  showArrowLeft,
  showArrowRight,
  handleClickButtonLeft,
  handleClickButtonRight
}: ListControlsProps) {
  return (
    <div className="w-full h-full hidden md:flex justify-between absolute px-3 top-0 pointer-events-none">
      <div
        className={`w-[${controlButtonWidth}] flex items-center justify-center`}
      >
        {showArrowLeft && (
          <button
            className="bg-primary rounded-full w-10 h-10 flex items-center justify-center cursor-pointer pointer-events-[all] z-10"
            onClick={handleClickButtonLeft}
          >
            <IconArrowLeft className="h-6 fill-white stroke-white" />
          </button>
        )}
      </div>

      <div
        className={`w-[${controlButtonWidth}] flex items-center justify-center`}
      >
        {showArrowRight && (
          <button
            className="bg-primary rounded-full w-10 h-10 flex items-center justify-center cursor-pointer pointer-events-[all] z-10"
            onClick={handleClickButtonRight}
          >
            <IconArrowRight className="h-6 fill-white stroke-white" />
          </button>
        )}
      </div>
    </div>
  );
}
