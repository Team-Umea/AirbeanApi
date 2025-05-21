const About = () => {
  return (
    <section className="flex flex-col items-center justify-center bg-amber-100 rounded-3xl max-w-3xl mx-auto mt-5">
      <h1 className="text-5xl font-bold text-center text-gray-700 m-8">
        Vårt kaffe
      </h1>
      <p className="text-lg text-gray-700 m-4 font-semibold">
        Vi är stolta över att erbjuda ett brett utbud av högkvalitativa
        kaffebönor från hela världen. Våra bönor är noggrant utvalda och rostade
        för att ge dig den bästa möjliga smaken och aromen. Oavsett om du
        föredrar en fyllig espresso eller en mild bryggkaffe, har vi något för
        alla kaffeälskare.
      </p>
      <br />
      <br />
      <p className="text-lg text-gray-700 m-4">
        Vår passion för kaffe sträcker sig bortom bara smaken. Vi är också
        engagerade i hållbarhet och rättvis handel. Vi arbetar direkt med bönder
        och kooperativ för att säkerställa att de får en rättvis betalning för
        sina bönor och att odlingen sker på ett miljövänligt sätt. Genom att
        välja vårt kaffe stödjer du inte bara din egen njutning, utan också en
        mer hållbar framtid för kaffeodlare världen över.
        <br />
        <br />
        Vi erbjuder också en mängd olika bryggmetoder och utrustning för att
        hjälpa dig att få ut det mesta av ditt kaffe. Oavsett om du är nybörjare
        eller en erfaren barista, har vi allt du behöver för att brygga den
        perfekta koppen.
      </p>
      <img
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.freepik.com%2Fpremium-photo%2Fproud-coffee-shop-owner-standing-front-cozy-coffee-shop-confident-entrepreneur_114016-1416.jpg&f=1&nofb=1&ipt=765a358782882fb9e4dec7389543db6dedb9c61ba7432d25edb6982a6412c508&ipo=images"
        alt="Bild på ägaren"
        className="rounded-full shadow-lg m-8 w-80 h-80 object-cover"
      />
      <figcaption className="text-center mb-8">
        <p>
          <span className="font-bold text-2xl">Covfé Espressino</span>
          <br />
          <span className="italic">VD & Grundare</span>
        </p>
      </figcaption>
    </section>
  );
};

export default About;
