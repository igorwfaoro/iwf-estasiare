import './index.scss';

export default function HomeHeader() {
  return (
    <header id="home-header">
      <div className="content">
        <img className="content_logo" src="/images/site-logo.svg" alt="Logo" />

        <h1>Eventy</h1>
        <h2>Construindo momentos mágicos!</h2>
      </div>
    </header>
  );
}
