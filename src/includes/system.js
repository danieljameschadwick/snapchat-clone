export const promise = (promise) =>
    promise
        .then((data) => {
            if (data instanceof Error) return [data];
            return [null, data];
        })
        .catch((err) => [err]);