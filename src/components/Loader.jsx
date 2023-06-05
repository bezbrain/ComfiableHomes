import "../styles/loader.css";

const Loader = ({ loaderCss }) => {
  return (
    <>
      <div className={`loader ${loaderCss}`}></div>
    </>
  );
};

export default Loader;
