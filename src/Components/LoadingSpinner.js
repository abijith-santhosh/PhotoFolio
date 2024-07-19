import Spinner from 'react-spinner-material';

function LoadingSpinner() {
  return (
    <div className="spinnercontainer">
      <Spinner size={120} color={"#333"} stroke={2} visible={true} />
    </div>
  );
}

export default LoadingSpinner;