import router from '../../router'


export const pushRouteTo = (route) => {
    try {
        console.log(route)
        router.push(`/${route}`);
    } catch (error) {
        console.log(error)
        if (!(error instanceof NavigationDuplicated)) {
            throw error;
        }
    }
}