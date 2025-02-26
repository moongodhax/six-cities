import { Link } from 'react-router-dom';
import Header from '../header/header';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <div className="container">
          <h1>404. Page not found</h1>
          <Link to="/">Return to main page</Link>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
