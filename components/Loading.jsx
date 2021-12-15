const Loading = ({ message }) => {
  return (
    <div className="loading">
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
      {message ? <i>{message}</i> : <></>}
    </div>
  );
};

export default Loading;
