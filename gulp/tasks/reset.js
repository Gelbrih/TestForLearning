import del from "del";

export const reset = () => {
    return del(path.clean)
}