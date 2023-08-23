import { router } from "@/router";

export const handleRoute = (urlPath: string) => {
    if (window.location.pathname !== urlPath) {
        return router.push(urlPath);
    }

    return null;
}