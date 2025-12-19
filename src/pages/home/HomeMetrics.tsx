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
      <div className="container p-block-4">
        <h2 className="sr-only">
          So far, we have over 5,000 material resources to help scientific
          officers enhance their skills!
        </h2>

        <ul className="home__metric--list flex flex-@md-row flex-@sm-column jc-@md-between ai-center gap-5">
          {metrics.map((metric) => (
            <li className="home__metric--item text-center" key={metric.label}>
              <h3 className="home__metric--item__value clr-primary-100 fw-bold">
                {metric.value}
              </h3>
              <p className="home__metric--item__label clr-primary-300">
                {metric.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HomeMetrics;
