import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";

import type { OverviewProps } from "../types";
import type { Swiper as SwiperType } from "swiper";

import Icon from "../../../../components/Icon";

const Overview = ({
  questions,
  userAnswers,
  questionNum,
  setCurrentQuestionIndex,
}: OverviewProps) => {
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const isMobile = useMediaQuery({ breakpoint: "sm" });
  const isTablet = useMediaQuery({ breakpoint: "md" });

  useEffect(() => {
    if (isMobile) {
      setSlidesPerView(6);
    } else if (isTablet) {
      setSlidesPerView(8);
    } else {
      setSlidesPerView(3);
    }
  }, [isMobile, isTablet]);

  // TODO: Add functionality for the current question  to be in view when the user navigates to it, and also for the user to be able to click on a question in the overview to navigate to that question.

  return (
    <section className="practice__session--overview p-block-3 p-inline-5 m-block-end-3">
      <Swiper
        className="practice__session--overview__container"
        wrapperTag="ul"
        wrapperClass="practice__session--overview__list"
        spaceBetween={10}
        slidesPerView={slidesPerView}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
      >
        {questions.map((q, i) => {
          const userAnswer = userAnswers.get(q.id);
          const defaultClassName = "practice__session--overview__question";
          const currentQuestionClass =
            questionNum === i ? `${defaultClassName}--current` : "";
          const layoutClassName = `${defaultClassName} p-block-1 flex gap-1 jc-center ai-center`;
          let isCorrectClass = "";
          let hoverClass = `${defaultClassName}--hover`;
          let iconName = "radio_button_unchecked";

          if (userAnswer) {
            hoverClass = "";

            if (userAnswer.isCorrect === true) {
              iconName = "check_small";
              isCorrectClass = `${defaultClassName}--correct`;
            } else if (userAnswer.isCorrect === false) {
              iconName = "close_small";
              isCorrectClass = `${defaultClassName}--incorrect`;
            }
          }

          const className = `${layoutClassName} ${isCorrectClass} ${currentQuestionClass} ${hoverClass}`;
          const iconClassName = `${defaultClassName}--icon grid`;

          return (
            <SwiperSlide
              key={q.id}
              tag="li"
              className={className}
              onClick={() => setCurrentQuestionIndex(i)}
            >
              <Icon name={iconName} className={iconClassName} />
              <span>{isTablet ? `Question ${i + 1}` : `Q ${i + 1}`}</span>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <SlideButton direction="prev" swiperInstance={swiperInstance} />
      <SlideButton direction="next" swiperInstance={swiperInstance} />
    </section>
  );
};

const SlideButton = ({
  direction,
  swiperInstance,
}: {
  direction: "next" | "prev";
  swiperInstance: SwiperType | null;
}) => {
  const isNext = direction === "next";

  const handleClick = () => {
    if (isNext) {
      swiperInstance?.slideNext();
    } else {
      swiperInstance?.slidePrev();
    }
  };

  return (
    <button
      className="practice__session--overview__slideButton"
      onClick={handleClick}
    >
      <Icon name={direction === "next" ? "chevron_right" : "chevron_left"} />
    </button>
  );
};

export default Overview;
