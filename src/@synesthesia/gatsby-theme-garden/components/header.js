import React from "react";
import { Link } from "gatsby";

import useSiteMetadata from "@synesthesia/gatsby-theme-garden/src/use-site-metadata";
import DarkModeToggle from "@synesthesia/gatsby-theme-garden/src/components/dark-mode-toggle";
import GraphButton from "@synesthesia/gatsby-theme-garden/src/components/graph-button";

import "@synesthesia/gatsby-theme-garden/src/components/header.css";
import { Search } from "@synesthesia/gatsby-theme-garden/src/components/search";

const Header = () => {
  const siteMetadata = useSiteMetadata();

  return (
    <header>
      <Link to="/">
        <h3>{siteMetadata.title}</h3>
      </Link>
      <div className="controls">
        <Search />
        <GraphButton />
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default Header;
