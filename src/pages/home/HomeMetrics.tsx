import { useAppData } from "../../context/useAppData";

import Container from "../../components/Container";

const HomeMetrics = () => {
  const { metrics } = useAppData();

  const formatNumber = (number: number, addPlus: boolean = true) => {
    const isLessThanTen = number < 10;

    if (isLessThanTen) {
      return number.toLocaleString();
    }

    const roundedNumber = Math.round(number / 10) * 10;

    return `${roundedNumber.toLocaleString()}${addPlus ? "+" : ""}`;
  };

  const totalResources = formatNumber(
    metrics.reduce((acc, metric) => acc + metric.value, 0),
    false,
  );

  return (
    <section className="home__metric">
      <Container>
        <div className="home__metric__content p-4 bg-pattern">
          <h2 className="home__section--title home__metric--title">
            Our Impact in Numbers
          </h2>

          <p className="home__section--description m-block-end-5 clr-primary-200">
            So far, we have over <strong>{totalResources}</strong> material
            resources to help scientific officers enhance their skills!
          </p>

          <ul className="home__metric--list gap-4">
            {metrics.map((metric) => (
              <li
                className="home__metric--item text-center bg-primary-100 p-3"
                key={metric.title}
              >
                <h3 className="home__metric--item__value clr-primary-100 fw-bold">
                  {formatNumber(metric.value)}
                </h3>
                <p className="home__metric--item__label clr-primary-300">
                  {metric.title}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
};

export default HomeMetrics;
