import './spinner.css';

function Spinner(): JSX.Element {
  return (
    <div className="spinner">
      <div className="spinner__animation"></div>
      <p className="spinner__text">Loading...</p>
    </div>
  );
}

export default Spinner;
