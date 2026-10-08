const PracticeLoaderView = () => {
  return (
    <div className="practice__loader--page practice page bg-primary-900">
      <div className="practice__loader--container container flex jc-center ai-center">
        <div className="practice__loader loader">
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} className="practice__loader--text">
              <span>Loading</span>
            </div>
          ))}

          <div className="practice__loader--line"></div>
        </div>
      </div>
    </div>
  );
};

export default PracticeLoaderView;
