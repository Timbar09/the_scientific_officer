import { useRef, useEffect, useLayoutEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";

import type { OverviewProps, RightOverviewProps } from "../types";
import type { Swiper as SwiperType } from "swiper";

import Icon from "../../../../components/Icon";
import type { UserAnswer } from "../../types";

const PARENT_CN = "practice__session--overview";

const Overview = ({
  questions,
  userAnswers,
  questionNum,
  setCurrentQuestionIndex,
  questionCardRef,
  swiperInstance,
  setSwiperInstance,
}: OverviewProps) => {
  const isDesktop = useMediaQuery({ breakpoint: "lg" });

  const layoutClassName = isDesktop ? "p-4" : "p-block-3 p-inline-5";
  const className = `${PARENT_CN} ${layoutClassName}`;

  return (
    <section className={className}>
      {isDesktop ? (
        <RightOverview
          questions={questions}
          userAnswers={userAnswers}
          questionNum={questionNum}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          questionCardRef={questionCardRef}
        />
      ) : (
        <TopOverview
          questions={questions}
          userAnswers={userAnswers}
          questionNum={questionNum}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          swiperInstance={swiperInstance}
          setSwiperInstance={setSwiperInstance}
        />
      )}
    </section>
  );
};

const TopOverview = ({
  questions,
  userAnswers,
  questionNum,
  setCurrentQuestionIndex,
  swiperInstance,
  setSwiperInstance,
}: OverviewProps) => {
  const [slidesPerView, setSlidesPerView] = useState(1);
  const isMobile = useMediaQuery({ breakpoint: "sm" });
  const isTablet = useMediaQuery({ breakpoint: "md" });

  useEffect(() => {
    if (isMobile) {
      setSlidesPerView(4);
    } else if (isTablet) {
      setSlidesPerView(6);
    } else {
      setSlidesPerView(1);
    }
  }, [isMobile, isTablet]);

  // TODO: Add functionality for the current question  to be in view when the user navigates to it, and also for the user to be able to click on a question in the overview to navigate to that question.

  return (
    <>
      <Swiper
        className="practice__session--overview__top"
        wrapperTag="ul"
        wrapperClass="practice__session--overview__list"
        spaceBetween={10}
        slidesPerView={slidesPerView}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
      >
        {questions.map((q, i) => {
          const userAnswer = userAnswers.get(q.id);

          return (
            <SwiperSlide
              key={q.id}
              tag="li"
              className={`${PARENT_CN}__question--container`}
            >
              <OverviewItem
                index={i}
                answer={userAnswer}
                isCurrent={questionNum === i}
                handleClick={() => setCurrentQuestionIndex(i)}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <SlideButton direction="prev" swiperInstance={swiperInstance} />
      <SlideButton direction="next" swiperInstance={swiperInstance} />
    </>
  );
};

const RightOverview = ({
  questions,
  userAnswers,
  questionNum,
  setCurrentQuestionIndex,
  questionCardRef,
}: RightOverviewProps) => {
  const listRef = useRef<HTMLUListElement>(null);
  const [height, setHeight] = useState<number | null>(
    questionCardRef?.current?.offsetHeight || null,
  );
  const [listPosition, setListPosition] = useState(0);

  useLayoutEffect(() => {
    const list = listRef.current;
    const card = questionCardRef?.current;

    if (!list || !card) {
      return;
    }

    const currentItem = list.querySelectorAll<HTMLLIElement>("li")[questionNum];
    const itemHeight = currentItem?.offsetHeight ?? 0;
    const itemOffsetTop = currentItem ? currentItem.offsetTop : 0;
    const listHeight = list.scrollHeight;
    const clampMax = Math.max(0, listHeight - card.offsetHeight);
    const targetOffset = itemOffsetTop - (card.offsetHeight - itemHeight) / 2;

    setHeight(card.offsetHeight);
    setListPosition(Math.min(Math.max(targetOffset, 0), clampMax));
  }, [questionCardRef, questionNum, questions.length]);

  const rightOverviewStyle = {
    maxHeight: height ? `${height}px` : "100%",
  };

  const rightOverviewListStyle = {
    transform: `translateY(-${listPosition}px)`,
  };

  return (
    <div
      className="practice__session--overview__right"
      style={rightOverviewStyle}
    >
      <ul
        className="practice__session--overview__right--list flex flex-col gap-1"
        ref={listRef}
        style={rightOverviewListStyle}
      >
        {questions.map((q, i) => {
          const userAnswer = userAnswers.get(q.id);
          const isCurrent = questionNum === i;

          return (
            <li key={q.id} className={`${PARENT_CN}__question--container`}>
              <OverviewItem
                index={i}
                answer={userAnswer}
                isCurrent={isCurrent}
                handleClick={() => setCurrentQuestionIndex(i)}
              />
            </li>
          );
        })}
      </ul>
    </div>
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

const OverviewItem = ({
  index,
  answer,
  isCurrent,
  handleClick,
}: {
  index: number;
  answer: UserAnswer | undefined;
  isCurrent: boolean;
  handleClick: () => void;
}) => {
  const baseClassName = `${PARENT_CN}__question`;
  const currentQuestionClass = isCurrent ? `${baseClassName}--current` : "";
  const layoutClassName = `${baseClassName} p-1 flex-inline gap-1 jc-center ai-center`;
  let isCorrectClass = "";
  let hoverClass = `${baseClassName}--hover`;
  let iconName = "radio_button_unchecked";

  if (answer) {
    hoverClass = "";

    if (answer.isCorrect === true) {
      iconName = "check_small";
      isCorrectClass = `${baseClassName}--correct`;
    } else if (answer.isCorrect === false) {
      iconName = "close_small";
      isCorrectClass = `${baseClassName}--incorrect`;
    }
  }

  const className = `${layoutClassName} ${isCorrectClass} ${currentQuestionClass} ${hoverClass}`;
  const iconClassName = `${baseClassName}--icon grid`;

  return (
    <button className={className} onClick={handleClick}>
      <Icon name={iconName} className={iconClassName} />
      <span>Question {index + 1}</span>
    </button>
  );
};

export default Overview;
