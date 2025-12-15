import React from "react";

/**
 * Spinner di caricamento
 */
export function LoadingSpinner({ size = "md" }) {
  const sizeClass = {
    sm: "spinner-border-sm",
    md: "",
    lg: "spinner-border-lg",
  }[size];

  return (
    <div className="d-flex justify-content-center align-items-center p-5">
      <div className={`spinner-border ${sizeClass}`} role="status">
        <span className="visually-hidden">Caricamento...</span>
      </div>
    </div>
  );
}

/**
 * Alert di errore
 */
export function ErrorAlert({ message, onRetry, dismissible = true }) {
  const [show, setShow] = React.useState(true);

  if (!show) return null;

  return (
    <div className="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Errore!</strong> {message}
      {onRetry && (
        <button
          type="button"
          className="btn btn-sm btn-outline-danger ms-2"
          onClick={onRetry}
        >
          Riprova
        </button>
      )}
      {dismissible && (
        <button
          type="button"
          className="btn-close"
          onClick={() => setShow(false)}
        />
      )}
    </div>
  );
}

/**
 * Container generico con skeleton loader
 */
export function LoadingContainer({ loading, error, children, onRetry }) {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message={error} onRetry={onRetry} />;
  }

  return <>{children}</>;
}

/**
 * Skeleton loader per articoli
 */
export function ArticleSkeletonLoader({ count = 3 }) {
  return (
    <div className="row">
      {Array.from({ length: count }).map((_, i) => (
        <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2" key={i}>
          <div className="blog-post rounded shadow placeholder-wave">
            <div className="placeholder col-12" style={{ height: "200px" }}></div>
            <div className="content pt-4 pb-4 p-3">
              <div className="placeholder col-75"></div>
              <div className="placeholder col-100"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Messaggio empty state
 */
export function EmptyState({ message = "Nessun dato disponibile", icon = "⚠️" }) {
  return (
    <div className="text-center p-5">
      <p className="text-muted fs-3">{icon}</p>
      <p className="text-muted">{message}</p>
    </div>
  );
}
