import useEmblaCarousel from "embla-carousel-react";

import {
  BiSolidChevronLeftSquare,
  BiSolidChevronRightSquare,
} from "react-icons/bi";
import React from "react";

type Slide = string;

interface Props {
  slides: Slide[];
}

export default function ImageCarousel({ slides }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const updateSelected = React.useCallback(() => {
    if (!emblaApi || !emblaThumbsApi) return;
    const idx = emblaApi.selectedScrollSnap();
    setSelectedIndex(idx);
    emblaThumbsApi.scrollTo(idx);
  }, [emblaApi, emblaThumbsApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateSelected);
    updateSelected();
  }, [emblaApi, updateSelected]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const scrollTo = (index: number) => {
    emblaApi?.scrollTo(index);
    updateSelected();
  };

  const getThumbnailUrl = (url: string, width = 200, height?: number) => {
    const baseUrl = url.replace("/object/", "/render/image/");
    const sizeParams = height
      ? `width=${width}&height=${height}`
      : `width=${width}`;
    return `${baseUrl}?${sizeParams}`;
  };
  return (
    <div className="space-y-4 ">
      {/* Main carousel */}
      <div className="relative">
        <button onClick={scrollPrev} className="absolute left-4 top-1/2 z-10">
          <BiSolidChevronLeftSquare className="h-12 w-12 opacity-75" />
        </button>
        <button onClick={scrollNext} className="absolute right-4 top-1/2 z-10">
          <BiSolidChevronRightSquare className="h-12 w-12 opacity-75" />
        </button>
        <div className=" absolute bottom-4 left-1/2 z-30 transform -translate-x-[50%] opacity-80 bg-gray-600 p-2 rounded-md text-white">
          <p>
            {selectedIndex + 1}/{slides.length}
          </p>
        </div>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slides.map((slide, idx) => (
              <div
                key={idx}
                className="flex-[0_0_100%] aspect-video rounded-md overflow-hidden"
              >
                <img
                  src={slide}
                  alt={`Slide ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Thumbnail carousel */}
      <div className="overflow-hidden" ref={emblaThumbsRef}>
        <div className="flex gap-2">
          {slides.map((slide, idx) => {
            return (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={`flex-[0_0_20%] rounded-md overflow-hidden box-content h-20  ${
                  selectedIndex === idx
                    ? "border-2 border-blue-800"
                    : "opacity-100"
                }`}
              >
                <img
                  src={slide}
                  alt={`Thumb ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
