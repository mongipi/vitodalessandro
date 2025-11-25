import { useEffect } from "react";

export default function FacebookFeed() {
  useEffect(() => {
    // Se lo script non è già stato caricato, lo aggiungiamo
    if (!document.getElementById("facebook-jssdk")) {
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.src =
        "https://connect.facebook.net/it_IT/sdk.js#xfbml=1&version=v24.0&appId=1534415464419451";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    } else if (window.FB) {
      // Se l'SDK è già presente, rielabora i plugin
      window.FB.XFBML.parse();
    }
  }, []);

  return (
    <>
      <div id="fb-root"></div>

      <div
        className="fb-page"
        data-href="https://www.facebook.com/vitodalessandrobitonto?locale=it_IT"
        data-tabs="timeline"
        data-width="340"
        data-height="500"
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
      >
        <blockquote
          cite="https://www.facebook.com/vitodalessandrobitonto?locale=it_IT"
          className="fb-xfbml-parse-ignore"
        >
          <a href="https://www.facebook.com/vitodalessandrobitonto?locale=it_IT">
            Vito D’Alessandro - Un Cittadino “in Comune”
          </a>
        </blockquote>
      </div>
    </>
  );
}
