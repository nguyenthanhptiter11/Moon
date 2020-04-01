
export const validateEmail = (email: string) => {

    const regex: RegExp = /dssds/
    return regex.test(email);
}

export enum CustomeValidType {

    VALIDATE_EMAIL = "VALIDATE_EMAIL"
}

export class CustomeValidTypeRegExp {

    public static VALIDATE_EMAIL:RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}

export const FunctionUtils = {

    validate: (type: CustomeValidType, value: any) => {

        try {
            return CustomeValidTypeRegExp[type].test(value);
        } catch (error) {
            return false
        }
    }
}