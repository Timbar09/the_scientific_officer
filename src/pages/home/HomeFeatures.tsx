const HomeFeatures = () => {
  const features = [
    {
      icon: "Neurology",
      title: "Practice Questions",
      description:
        "Enhance your knowledge and skills with a variety of practice questions tailored for scientific officers, covering key topics and scenarios.",
      link: "/practice",
    },
    {
      icon: "menu_book",
      title: "Resources",
      description:
        "Utilize curated resources including guides, tutorials, and reference materials to support your learning and professional development.",
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
    // {
    //   icon: "Science",
    //   title: "Mock Tests",
    //   description:
    //     "Simulate real exam conditions with our mock tests, designed to help you assess your readiness and improve your test-taking strategies.",
    //   link: "/practice",
    // },
    // {
    //   icon: "Newspaper",
    //   title: "Comprehensive Articles",
    //   description:
    //     "Access a wide range of articles covering essential topics for scientific officers, from research methodologies to regulatory compliance.",
    // },
  ];
  return (
    <section className="home__feature main__section">
      <div className="container">
        <h2 className="home__section--title clr-primary-900 m-block-end-3">
          Everything You Need to Excel
        </h2>

        <p className="home__feature--description">
          Our platform provides comprehensive tools and resources designed
          specifically for animal science professionals.
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
      </div>
    </section>
  );
};

export default HomeFeatures;
