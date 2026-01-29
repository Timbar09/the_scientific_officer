const HomeMetrics = () => {
  const metrics = [
    {
      value: "5,000+",
      label: "Practice Questions",
    },
    {
      value: "17+",
      label: "Topics Covered",
    },
    {
      value: "1,200+",
      label: "Resources",
    },
    {
      value: "500+",
      label: "Articles",
    },
    // {
    //   value: "10,000+",
    //   label: "Active Users",
    // },
  ];

  return (
    <section className="home__metric">
      <div className="container">
        <div className="home__metric__content p-4">
          <h2 className="home__section--title home__metric--title">
            Our Impact in Numbers
          </h2>

          <p className="home__section--description m-block-end-4 clr-primary-200">
            So far, we have over 5,000 material resources to help scientific
            officers enhance their skills!
          </p>

          <ul className="home__metric--list gap-4">
            {metrics.map((metric) => (
              <li
                className="home__metric--item text-center bg-primary-100 p-3"
                key={metric.label}
              >
                <h3 className="home__metric--item__value clr-primary-100 fw-bold m-block-end-1">
                  {metric.value}
                </h3>
                <p className="home__metric--item__label clr-primary-300">
                  {metric.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HomeMetrics;
