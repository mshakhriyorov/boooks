import router from "@/router";

export const handleRoute = (urlPath: string) => {
    if(router.currentRoute.fullPath !== urlPath){
        return router.push(urlPath);
    }

    return null;
}