import React from "react";
import Reference from "gatsby-theme-garden/src/components/reference";

import "gatsby-theme-garden/src/components/references-block.css";

const ReferencesBlock = ({ references }) => {

  const footer = (
    <React.Fragment>
      <h3>Copyright</h3>
      <p>
        Unless otherwise noted all content on this site is (c) copyright <a href="https://www.synesthesia.co.uk">Julian Elve</a> 2020 onwards, released under a <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International</a> licence.
      </p>
    </React.Fragment>
  );

  if (!references.length) {
    return <div className="references-block">{footer}</div>;
  }

  return (
    <div className="references-block">
      <h3>Referred in</h3>
      <div>
        {references.map((ref) => (
          <Reference node={ref} key={ref.id} />
        ))}
      </div>
      <hr />
      {footer}
    </div>
  );
};

export default ReferencesBlock;
