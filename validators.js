export const loginValidator = values => {
    let errors = {};
    if (!values.username){
        errors.username = true
        errors.error = 'Username is required'
    }
    if (!values.password){
        errors.password = true
        errors.error = 'Password is required'
    }
    return errors
}
export const registerValidator = values => {
    let errors = {};
    if (!values.username){
        errors.username = true
        errors.error = 'Username is required'
    }
    if (!values.password){
        errors.password = true
        errors.error = 'Password is required'
    }
    if (isFinite(values.username[0])){
        errors.username = true
        errors.error = 'Name must not start with a number.'
    }
    if (values.password.length<4 || values.username.length<4){
        errors.username = true
        errors.password = true
        errors.error = 'Min length - 5 characters'
    }
    return errors
}