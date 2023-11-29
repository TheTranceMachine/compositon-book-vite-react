import './Breadcrumbs.scss';

const Breadcrumbs = () => {
  return (
    <nav style={{ '--bs-breadcrumb-divider': '' }} aria-label="breadcrumb">
      <ol className="breadcrumb bg-body-tertiary">
        <li className="breadcrumb-item">
          <a href="#">Home</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Library
        </li>
      </ol>
    </nav>
  );
};

export { Breadcrumbs };
