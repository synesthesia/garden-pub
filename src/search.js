import React, { useState, useEffect, useMemo } from "react";
import FlexSearch from "flexsearch";
import { graphql, useStaticQuery, navigate } from "gatsby";
import Downshift from "downshift";

import "./search.css";

export const useFlexSearch = (query, searchOptions) => {
  const [store, setStore] = useState(null);
  const [pathIndex, setPathIndex] = useState(null);
  const [titleIndex, setTitleIndex] = useState(null);
  const [bodyIndex, setBodyIndex] = useState(null);

  const data = useStaticQuery(graphql`
    query SearchBarQuery {
      localSearchPaths {
        publicIndexURL
        publicStoreURL
      }
      localSearchTitles {
        publicIndexURL
      }
      localSearchBodies {
        publicIndexURL
      }
    }
  `);

  useEffect(() => {
    fetch(data.localSearchPaths.publicIndexURL)
      .then((result) => result.text())
      .then((res) => {
        const importedIndex = FlexSearch.create();
        importedIndex.import(res);

        setPathIndex(importedIndex);
      });
    fetch(data.localSearchTitles.publicIndexURL)
      .then((result) => result.text())
      .then((res) => {
        const importedIndex = FlexSearch.create();
        importedIndex.import(res);

        setTitleIndex(importedIndex);
      });
    fetch(data.localSearchBodies.publicIndexURL)
      .then((result) => result.text())
      .then((res) => {
        const importedIndex = FlexSearch.create();
        importedIndex.import(res);

        setBodyIndex(importedIndex);
      });
    fetch(data.localSearchPaths.publicStoreURL)
      .then((result) => result.json())
      .then((res) => {
        setStore(res);
      });
  }, []);

  return useMemo(() => {
    if (!query || !store || (!pathIndex && !bodyIndex && !titleIndex))
      return [
        {
          id: "loading",
          title: "",
          excerpt: <div class="lds-dual-ring"></div>,
        },
      ];

    const rawPathResults = pathIndex
      ? pathIndex.search(query, searchOptions)
      : [];
    const rawBodyResults = bodyIndex
      ? bodyIndex.search(query, searchOptions)
      : [];
    const rawTitleResults = titleIndex
      ? titleIndex.search(query, searchOptions)
      : [];

    const uniqIds = new Set();

    return rawPathResults
      .concat(rawTitleResults)
      .concat(rawBodyResults)
      .filter((id) => {
        if (uniqIds.has(id)) {
          return false;
        }
        uniqIds.add(id);
        return true;
      })
      .map((id) => store[id]);
  }, [query, pathIndex, titleIndex, bodyIndex, store]);
};

export function Search() {
  const [query, setQuery] = useState("");

  const results = useFlexSearch(query);

  return (
    <Downshift
      onChange={(selection) => navigate(selection.path)}
      itemToString={(item) => (item ? item.title : "")}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        highlightedIndex,
        getRootProps,
      }) => (
        <div
          className="searchWrapper"
          {...getRootProps({}, { suppressRefError: true })}
        >
          <SearchBar
            query={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            getInputProps={getInputProps}
          />
          <Results
            isOpen={isOpen}
            getMenuProps={getMenuProps}
            getItemProps={getItemProps}
            results={results}
            highlightedIndex={highlightedIndex}
          />
        </div>
      )}
    </Downshift>
  );
}

function SearchBar({ query, onChange, getInputProps }) {
  return (
    <div className="inputWrapper">
      <svg
        className="searchIcon"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782z" />
      </svg>
      <input
        {...getInputProps({
          placeholder: "Search...",
          onChange: onChange,
        })}
        type="text"
      />
    </div>
  );
}

function Results({
  isOpen,
  results,
  getItemProps,
  getMenuProps,
  highlightedIndex,
}) {
  return (
    isOpen && (
      <ul className="results" {...getMenuProps()}>
        {results.map((r, index) => (
          <li
          key={r.id}
            //key={index.toString()}
            {...getItemProps({
              index,
              item: r,
              style: {
                background:
                  highlightedIndex === index
                    ? "var(--references-bg)"
                    : "var(--note-bg)",
              },
            })}
          >
            <div className="title">{r.title}</div>
            <div className="excerpt">{r.excerpt}</div>
          </li>
        ))}
      </ul>
    )
  );
}
