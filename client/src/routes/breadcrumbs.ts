import routes from "./routes"

const getBreadcrumbs = (pathname: string) => {

    const path = pathname !== '/' ? pathname.replace('/', '') : pathname;

    const route = routes.find((x => x.path === path));

    return route?.title || 'Deviation list > transfer ' + pathname.split('/').reverse()[0];

}

export default getBreadcrumbs