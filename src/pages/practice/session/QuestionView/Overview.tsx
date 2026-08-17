import { useEffect, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";

import type { OverviewProps } from "../types";

import Icon from "../../../../components/Icon";

const Overview = ({ questions, userAnswers }: OverviewProps) => {
  const [slidesPerView, setSlidesPerView] = useState(3);
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
    <section className="practice__session--overview p-3 m-block-end-3">
      <Swiper
        className="practice__session--overview__container"
        wrapperTag="ul"
        wrapperClass="practice__session--overview__list p-inline-2"
        spaceBetween={10}
        slidesPerView={slidesPerView}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {questions.map((q, i) => {
          const userAnswer = userAnswers.get(q.id);
          const defaultClassName =
            "practice__session--overview__question p-block-1 flex gap-1 jc-center ai-center";
          let isCorrectClass = "";

          let iconName = "radio_button_unchecked";

          if (userAnswer) {
            if (userAnswer.isCorrect === true) {
              iconName = "check_small";
              isCorrectClass = "practice__session--overview__question--correct";
            } else if (userAnswer.isCorrect === false) {
              iconName = "close_small";
              isCorrectClass =
                "practice__session--overview__question--incorrect";
            }
          }

          const className = `${defaultClassName} ${isCorrectClass}`;
          const iconClassName =
            "practice__session--overview__question--icon grid";

          return (
            <SwiperSlide key={q.id} tag="li" className={className}>
              <Icon name={iconName} className={iconClassName} />
              <span>{isTablet ? `Question ${i + 1}` : `Q ${i + 1}`}</span>
            </SwiperSlide>
          );
        })}

        <SlideButton direction="prev" />
        <SlideButton direction="next" />
      </Swiper>
    </section>
  );
};

const SlideButton = ({ direction }: { direction: "next" | "prev" }) => {
  const swiper = useSwiper();
  const isNext = direction === "next";
  return (
    <button
      className="practice__session--overview__slideButton"
      onClick={() => (isNext ? swiper.slideNext() : swiper.slidePrev())}
    >
      <Icon name={direction === "next" ? "chevron_right" : "chevron_left"} />
    </button>
  );
};

export default Overview;
