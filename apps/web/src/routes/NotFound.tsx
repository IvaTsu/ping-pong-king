import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function NotFound(): JSX.Element {
  const error = useRouteError();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{isRouteErrorResponse(error) && <i>{error.statusText}</i>}</p>
      <p>{error instanceof Error && error.message}</p>
    </div>
  );
}
