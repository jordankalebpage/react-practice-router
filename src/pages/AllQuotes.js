import QuoteList from "../components/quotes/QuoteList";
import { useEffect } from "react";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

// const DUMMY_QUOTES = [
//   { id: "q1", author: "Jordan", text: "Learning React is fun" },
//   { id: "q2", author: "Max", text: "Learning React is great" },
// ];

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />;
  }

  // No error, not in a loading state, and we actually have quotes to display
  return <QuoteList quotes={loadedQuotes} />;
};

export default AllQuotes;
