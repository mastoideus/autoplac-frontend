const SuspenseErrorFallback = ({ error }: { error: Error }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error?.message || "An error occured"}</pre>
    </div>
  );
};

export default SuspenseErrorFallback;
