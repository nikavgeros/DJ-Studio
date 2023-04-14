import React from "react";

const About = () => {
  return (
    <div className="container card-container mt-5">
      <h1 style={{ textAlign: "center" }}>About Dj-Studio</h1>

      <div
        className="text-muted mt-5"
        style={{
          letterSpacing: "1px",
          lineHeight: "28px",
          fontSize: "18px",
        }}
      >
        <p>
          The <b>Dj-Studio</b> would allow users to save YouTube videos and
          audio tracks to their device for offline viewing or listening. This
          feature can be especially useful for users who want to watch or listen
          to content on the go, or who have limited internet access.
        </p>
        <p>
          To use this feature, a user would first need to search for the desired
          video or audio track on YouTube. Once the desired content has been
          located, the user can then select the "Download" option within the
          application. From there, the user can choose the desired video or
          audio format and quality, as well as the location on their device
          where they would like to save the file.
        </p>
        <p>
          Once the download is complete, the user can then access the saved
          video or audio track from their device's local storage, allowing them
          to watch or listen to the content even when they are offline. This can
          be especially useful for users who frequently travel or who have
          limited internet access, as it allows them to access their favorite
          content even when they are not connected to the internet.
        </p>
        <p>
          <b>
            <i>Subscription</i>
          </b>
          <br />
          If you want to get the most out of the app, be sure to login for free!
          By logging in, you'll have access to all of the amazing features that
          our app has to offer. One of the most popular features among our
          logged-in users is the ability to create and save playlists of their
          favorite videos and audio tracks. With this feature, you can easily
          organize and keep track of all of your favorite content, making it
          easy to access and watch or listen to anytime, anywhere. So don't miss
          out on this and all of the other amazing features that are available
          to our logged-in users. Simply click the login button and start
          enjoying all that <b>Dj-Studio</b> has to offer!
        </p>
        <p>
          Overall, the <b>Dj-Studio</b> is a convenient and useful application
          that allows users to easily save and access their favorite YouTube
          content offline.
        </p>
      </div>
    </div>
  );
};

export default About;
