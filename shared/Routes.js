import Home from './Home';
import Entity from './Entity';
import Entities from './Entities';
import EntityForm from './EntityForm';


export default [
    {
        path: '/',
        exact: true,
        component: Home,
    },
    {
        path: '/entities',
        exact: true,
        component: Entities,
    },
    {
        path: '/entities/:id',
        exact: true,
        component: Entity,
    },
    {
        path: '/entities/:id/update',
        exact: true,
        component: EntityForm,
    },
    {
        path: '/entities/new',
        exact: true,
        component: EntityForm,
    },
];