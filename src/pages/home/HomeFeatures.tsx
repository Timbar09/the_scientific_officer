const HomeFeatures = () => {
  const features = [
    {
      icon: "Quiz",
      title: "Practice Questions",
      description:
        "Enhance your knowledge and skills with a variety of practice questions tailored for scientific officers, covering key topics and scenarios.",
      link: "/practice",
    },
    {
      icon: "Science",
      title: "Mock Tests",
      description:
        "Simulate real exam conditions with our mock tests, designed to help you assess your readiness and improve your test-taking strategies.",
      link: "/practice",
    },
    // {
    //   icon: "Newspaper",
    //   title: "Comprehensive Articles",
    //   description:
    //     "Access a wide range of articles covering essential topics for scientific officers, from research methodologies to regulatory compliance.",
    // },
    {
      icon: "Stethoscope",
      title: "Interactive Tools",
      description:
        "Utilize interactive tools and resources that aid in understanding complex scientific concepts and procedures relevant to your role.",
      link: "/resources",
    },
    {
      icon: "LightBulb",
      title: "Industry Insights",
      description:
        "Stay updated with the latest trends and developments in the scientific field through our curated resources and expert analyses.",
      link: "/resources",
    },
    {
      icon: "Hub",
      title: "Community Support",
      description:
        "Join a community of scientific officers to share experiences, seek advice, and collaborate on best practices for professional growth.",
      link: "/about",
    },
    // {
    //   icon: "Update",
    //   title: "Regular Updates",
    //   description:
    //     "Stay informed with regular updates on the latest industry trends, research findings, and best practices to keep your knowledge current.",
    // },
  ];
  return (
    <section className="home__feature main__section">
      <h2 className="home__feature--title sr-only">Features</h2>

      <p className="home__feature--description sr-only">
        Discover the key features of our platform that empower scientific
        officers to excel in their roles. From comprehensive articles to
        interactive tools, explore how we support your professional growth and
        success.
      </p>

      <ul className="home__feature--list grid gap-4">
        {features.map((feature) => (
          <li
            className="home__feature--item flex flex-col gap-1"
            key={feature.title}
          >
            <div className="home__feature--item__icon">
              <span className="material-symbols-outlined p-2">
                {feature.icon}
              </span>
            </div>

            <h3 className="home__feature--item__title">{feature.title}</h3>

            <p className="home__feature--item__description">
              {feature.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HomeFeatures;
