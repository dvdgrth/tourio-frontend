import React from "react";
import { Link } from "react-router-dom";
import "../styles/About.css";

export default function About() {
  return (
    <div className="about-grid">
      <h1>About</h1>
      <p>
        MyLink🔗YourLink is a search engine which returns links submitted by
        users. When submitting links we ask you to describe them and describe
        the overall theme and intend of the new entry. This way others can
        decide if it sounds interesting to them. And if they have a look at your
        links, they are guided by your descriptions and may appreciate the added
        context and personal approach. They are taking a "tour" through the web
        guided by you. And you can take their tours.
      </p>
      <p>
        Existing search engines are amazing - for certain tasks, like getting
        links to big sites. For other tasks they are outright terrible or even
        manipulative, like when they spit out SEO optimized junk sites or
        advertising links. The web is full of great sites which currently just
        aren't found by your typical search engine or aren't ranked properly.
      </p>
      <p>
        Another related problem is the continuing stupidity of computers and
        their inability to understand what we are really looking for. We may
        have a better chance of finding what we want by relying not on
        algorithms but on other people. Wouldn't we benefit if instead of the
        typical data dump, we got curated links from a real person - maybe an
        expert on the topic, maybe not - but always from a different personal
        perspective?
      </p>
      <p>
        Have you ever done a long googleing session on a topic? Have you ever
        wondered if somebody else has already searched the exact same thing?
        There should be some way to "save and share" a search session, meaning
        the best (most helpful, interesting etc.) links one can find should be
        shareable. This way we could skip or shorten the initial phase of a
        search session which can be quite cumbersome: suffering through the mud
        of never ending substandard web sites in search for the good ones, the
        nuggets. Starting with the best finds of someone else could provide us
        with a valuable starting point for our own search or with links we would
        not have been able to find on our own. Probably, we would often still
        want to search for ourselves but by using the suggestions of others we
        could be more effective.
      </p>

      <p>
        We should remember the adventurous, elegant spirit of the early web: An
        ocean of ressources, of sites, of space stations if you will -
        interconnected by links, by waterways, by rocket routes. A "web" is
        woven, a new world is build - cyberspace: the new frontier. Much of the
        magic was lost or was never there to begin with but the basic idea of
        the internet (ressources interconnected by links) is very much alive and
        well and isn't going anywhere. Let's bring the magic back. Let's build
        beautiful tours through the web. Let's create Hitchhiker's Guides to the
        world wide web, with treasure maps to our favorite sites.
      </p>

      <p>
        MyLink🔗YourLink is not a direct competitor to existing search engines.
        Rather, it is a complementary form of search powered by you and me.
      </p>
      <p>
        Do you have any questions, comments or want to collaborate? Don't
        hesitate to get in{" "}
        <Link to={`/contact`} style={{ color: "orange" }}>
          contact
        </Link>
        .
      </p>
    </div>
  );
}
