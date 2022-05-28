import styles from './FormControl.module.css';

export const renderField = (Element: string) => ({input, meta: {touched, error}, ...props}: any) => {
    const hasError = touched && error;

    return (
        <div className={`${styles.form_control} ${hasError && styles.error}`}>
            <Element {...input} {...props}/>
            {hasError && <span>{error}</span>}
        </div>
    )
};