import React from "react";
import { Link } from "gatsby";

import useSiteMetadata from "gatsby-theme-garden/src/use-site-metadata";
import DarkModeToggle from "gatsby-theme-garden/src/components/dark-mode-toggle";
import GraphButton from "gatsby-theme-garden/src/components/graph-button";

import "gatsby-theme-garden/src/components/header.css";
import { Search } from "../../search";

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
