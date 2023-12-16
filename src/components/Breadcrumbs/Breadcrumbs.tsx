import './Breadcrumbs.scss';
import { Link } from 'react-router-dom';

type PagePropTypes = {
  id: number;
  link: string;
  name: string;
};

type BreadcrumbsPropTypes = {
  pages: Array<PagePropTypes>;
};

const Breadcrumbs = ({ pages }: BreadcrumbsPropTypes) => (
  <nav aria-label="breadcrumb">
    <ol className="breadcrumb bg-body-tertiary">
      <li className="breadcrumb-item">
        <Link to="/">HOME</Link>
      </li>
      {pages.map((page: PagePropTypes) => (
        <li className="breadcrumb-item active" aria-current="page" key={page.id}>
          <Link to={page.link}>{page.name}</Link>
        </li>
      ))}
    </ol>
  </nav>
);

export { Breadcrumbs };
