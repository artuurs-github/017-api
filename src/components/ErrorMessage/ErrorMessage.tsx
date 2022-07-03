import './ErrorMessage.scss';

type ErrorMessageProps = {
  message: string
}

const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <div className="error-message">
    <p>Something went wrong!</p>
    <p>Reload the page or try again later!</p>
  </div>
);

export default ErrorMessage;
