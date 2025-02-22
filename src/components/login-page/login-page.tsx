function LoginPage(): JSX.Element {
  return (
    <div className="page page--gray page--login">
      <header className="header">
        {/* ... header content ... */}
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post">
              {/* ... form content ... */}
            </form>
          </section>
          <section className="locations locations--login locations--current">
            {/* ... locations content ... */}
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
